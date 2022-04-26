import {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Pane, Card, Strong, toaster, Heading, IconButton, CrossIcon, Table, Badge, Pagination, Dialog, Text, Avatar, Button,Paragraph, AreaOfInterestIcon  } from 'evergreen-ui'
import { UserIcon, LogOutIcon, HomeIcon } from 'evergreen-ui'
//import {isMobile} from 'react-device-detect'
import LoadingComp from '../components/loading'
import Navbar from '../components/navbar'
import { adminService } from '@services/index'
import ListTickets from './components/listTickets'
// TODO: Por el momento se muestran 10 objetos por pagina, se puede usar una useState
// para poder modificar este numero y entregarlo dinamicamente a paginate() y setTotalPage(array, X, page) donde X sería el userState

function Travels(){
  const router = useRouter();
  const [pasajes, setPasajes] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [ticketSelected, setTicketSelected] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  const [showUserDetail, setShowUserDetail] = useState(false)
  const [userSelected, setUserSelected] = useState('')
  const [showLstTickets, setShowLstTickets] = useState(false)
  const [listTickets, setListTickets] = useState([])

  //Paginación
  function paginate(array, pageSize, pageNumber) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  }
  //Cambio de paginas
  const handlePageChange = async (e) => {
    setPage(e);
  }
   const handleLoad = async (e) => {
     //if(e){console.log('error')}
     try {
          //Se guardan los pasajes obtenidos
          setPasajes(e);
          //Se muestran los datos
          setIsLoading(false)
          //Total de objetos divido por 10, que es la misma cantidad que se entrega al paginar
          setTotalPage(Math.ceil(e.tickets.length/10));
     } catch (e) {
         throw e
     }
   }

   function handleDetails(){
      //const diasjs = JSON.parse(t)
      if(ticketSelected === ''){
        return(
          <></>
        )
      }else {
        const stringdata = JSON.stringify(ticketSelected);
        const parsedata = JSON.parse(stringdata);
        let name = `${ticketSelected.name} ${ticketSelected.lastName}`
        //const { lunes, martes, miercoles, jueves, viernes, sabado, domingo } = JSON.parse(parsedata.dias)
        //console.log(parsedata)
        return(
          <Pane marginBottom={35}>
          <Pane display='flex' justifyContent='space-around' alignItems='space-between'>
           <Strong color='muted'>Código</Strong>
           <Strong color='muted'>Origen - Destino</Strong>
          </Pane>
          <Pane display='flex' justifyContent='space-around' alignItems='space-between'>
           <Text color='muted'>{ticketSelected.code}</Text>
           <Text color='muted'>{ticketSelected.origen} - {ticketSelected.destino}</Text>
          </Pane>
          <Pane display='flex' justifyContent='space-around' alignItems='space-between' marginTop='20'>
           <Strong color='muted'>Costo Viaje</Strong>
           <Strong color='muted'>Hora Salida</Strong>
          </Pane>
          <Pane display='flex' justifyContent='space-around' alignItems='space-between'>
           <Text color='muted'>${ticketSelected.costoViaje}</Text>
           <Text color='muted'>{ticketSelected.horaSalida} Hrs.</Text>
          </Pane>
          <Pane display='flex' justifyContent='space-around' marginTop='20'>
           <Strong marginLeft={-20} color='muted'>Nº Asiento</Strong>
           <Strong marginRight={10} color='muted'>Fecha</Strong>
          </Pane>
          <Pane display='flex' marginTop='10px' flexDirection='row' justifyContent='space-between' alignItems='center'>
             <Text marginLeft={110} color='muted'>{ticketSelected.nroAsiento}</Text>
             <Text marginRight={100} color='muted'>{ticketSelected.fecha}</Text>
          </Pane>
          <Pane border='default' display='flex' margin={10} flexDirection='column' alignItems='center' marginTop={20}>
            <Pane display='flex' marginTop={15}>
            <Avatar margin={5} marginTop={10} hashValue="id_124" name={name} size={70} marginRight={120}  />
              <Pane margin={10} display='flex' flexDirection='column'>
              <Strong marginLeft={90} color='muted'>Pasaje comprado por:</Strong>
              <Text marginLeft={145} color='muted'>{ticketSelected.name} {ticketSelected.lastName}</Text>
              </Pane>
            </Pane>

            <Pane marginLeft={250} paddingBottom={20} marginTop={-15} >
              <Button onClick={() => showUserDet(ticketSelected.idUsers)}>Ver Datos de Usuario</Button>
            </Pane>

          </Pane>

          <Pane border='default' display='flex' margin={10} flexDirection='column' alignItems='center' marginTop={20}>
            <Pane display='flex' flexDirection='row' marginTop={20} marginLeft={20} marginRight={15}>
              <AreaOfInterestIcon color='muted' size={40} margin={10} />
              <Paragraph marginLeft={15} width='90%' color='muted'>Ver más PASAJES con los mismos criterios: Origen, Destino, Hora y Fecha.  </Paragraph>
            </Pane>

            <Pane marginLeft={250} paddingBottom={20} marginTop={-20} >
              <Button>Ver Pasajes</Button>
            </Pane>
          </Pane>
          </Pane>
        )
      }
    }
   function ticketDetail(t){
     return (
             <Dialog isShown={showDetail} title="Detalles de Pasaje"
               onCloseComplete={() => setShowDetail(false)}
               hasFooter={false}
             >
             {handleDetails()}
             </Dialog>
         )
   }
   function showPanelDet(t){
     setTicketSelected(t)
     setShowDetail(true)
   }

   function listTicketsPanel(){
     //console.log(userSelected.name)
     const tmpmsge = `Pasaje comprados por: ${userSelected.name} ${userSelected.lastName}`
     return (
             <Dialog width={'80%'} isShown={showLstTickets} title={tmpmsge}
               onCloseComplete={() => setShowLstTickets(false)}
               hasFooter={false}
             >
             <ListTickets listTickets={listTickets} />
             </Dialog>
         )
   }
   function showListTickets(idUser){
     //Solicitar lista de pasajes comprados por este Usuario
     adminService.getTicketsById(idUser).then(x => {
       //console.log(x)
       const tmplst = x.tickets
       setListTickets(tmplst)
       setShowLstTickets(true)
       //console.log(listTickets)
     }).catch((error) => {
       toaster.danger(error)
     })
   }

   function handleUserDetails(){
      //const diasjs = JSON.parse(t)
      if(userSelected === ''){
        return(
          <></>
        )
      }else {
        const stringdata = JSON.stringify(userSelected);
        const parsedata = JSON.parse(stringdata);
        let name = `${userSelected.name} ${userSelected.lastName}`
        //const { lunes, martes, miercoles, jueves, viernes, sabado, domingo } = JSON.parse(parsedata.dias)
        //console.log(parsedata)
        return(
          <Pane marginBottom={35}>
          <Pane display='flex' justifyContent='space-around' alignItems='space-between'>
           <Strong color='muted'>ID Usuario</Strong>
           <Strong color='muted' marginRight={40}>RUT</Strong>
          </Pane>
          <Pane display='flex' justifyContent='space-around' alignItems='space-between'>
           <Text color='muted'>{userSelected.idUsers}</Text>
           <Text color='muted' marginLeft={-20}>{userSelected.rut}</Text>
          </Pane>
          <Pane display='flex' justifyContent='space-around' alignItems='space-between' marginTop='20'>
           <Strong color='muted'>Nombre</Strong>
           <Strong color='muted'>Apellido</Strong>
          </Pane>
          <Pane display='flex' justifyContent='space-around' alignItems='space-between'>
           <Text color='muted'>{userSelected.name}</Text>
           <Text color='muted'>{userSelected.lastName}</Text>
          </Pane>
          <Pane display='flex' justifyContent='space-around' marginTop='20'>
           <Strong marginLeft={25} color='muted'>Phone</Strong>
           <Strong marginRight={10} color='muted'>Email</Strong>
           <Strong marginRight={10} color='muted'>Address</Strong>
          </Pane>
          <Pane display='flex' marginTop='10px' flexDirection='row' justifyContent='space-between' alignItems='center'>
             <Text marginLeft={70} color='muted'>{userSelected.phone}</Text>
             <Text marginRight={20} color='muted'>{userSelected.email}</Text>
             <Text marginRight={70} color='muted'>none</Text>
          </Pane>

          <Pane border='default' display='flex' margin={10} flexDirection='column' alignItems='center' marginTop={30}>
            <Pane display='flex' flexDirection='row' marginTop={20} marginLeft={20} marginRight={15}>
              <AreaOfInterestIcon color='muted' size={60} margin={10} />
              <Paragraph marginLeft={15} width='90%' color='muted'>Aqui puede ver todos los PASAJES comprados por este usuario.</Paragraph>
            </Pane>

            <Pane marginLeft={250} paddingBottom={20} marginTop={-25}>
              <Button onClick={() => showListTickets(userSelected.idUsers)}>Ver Pasajes</Button>
            </Pane>
          </Pane>
          </Pane>
        )
      }
    }
   function userDetail(t){
     return (
             <Dialog isShown={showUserDetail} title="Perfil de Usuario"
               onCloseComplete={() => setShowUserDetail(false)}
               hasFooter={false}
             >
             {handleUserDetails()}
             </Dialog>
         )
   }
   function showUserDet(t){
     adminService.getUsersById(t).then(x => setUserSelected(x.users[0])).catch((error) => {
       toaster.danger(error)
     })
     setShowUserDetail(true)
   }

  useEffect(() => {
    //handleLoad();
      adminService.getTickets().then(x => handleLoad(x)).catch((error) => {
        toaster.danger(error)
      })
  }, []);

  return(
    <>
    <Pane justifyContent='center' display='flex' marginTop={70}>
    <Heading size={800}>
      Pasajes vendidos
    </Heading>
    </Pane>
    {/*pasajes */}
    <Pane display='flex'  flexDirection='column' height='85vh' alignItems='center' justifyContent='start' paddingTop='3%'>
      <Card elevation={1} width='80%'>
        <Table>
          <Table.Head>
            <Table.SearchHeaderCell />
            <Table.TextHeaderCell >Origen - Destino</Table.TextHeaderCell>
            <Table.TextHeaderCell >Nombre Usuario</Table.TextHeaderCell>
            <Table.TextHeaderCell >Nº Asiento</Table.TextHeaderCell>
            <Table.TextHeaderCell >Fecha</Table.TextHeaderCell>
            <Table.TextHeaderCell >Hora Salida</Table.TextHeaderCell>
            <Table.TextHeaderCell >Costo Viaje</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height='auto' width='100%'>
            {isLoading ? <LoadingComp /> : ( paginate(pasajes.tickets,10,page).map((p) =>
              <Table.Row isSelectable key={p.idTicket} onSelect={()  => showPanelDet(p)}>
              <Table.TextCell>{p.code}</Table.TextCell>
              <Table.TextCell>{p.origen} - {p.destino}</Table.TextCell>
              <Table.TextCell>{p.name} {p.lastName}</Table.TextCell>
                <Table.TextCell>{p.nroAsiento}</Table.TextCell>
                <Table.TextCell>{p.fecha}</Table.TextCell>
                <Table.TextCell>{p.horaSalida} Hrs.</Table.TextCell>
                <Table.TextCell>${p.costoViaje}</Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Pagination page={page} onPageChange={handlePageChange} totalPages={totalPage}></Pagination>
    </Pane>
    {ticketDetail(ticketSelected)}
    {userDetail(userSelected)}
    {listTicketsPanel(listTickets)}
    </>
  )
}

export default Travels;
