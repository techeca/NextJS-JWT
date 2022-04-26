import {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Pane, Card, Strong, toaster, Heading, IconButton, CrossIcon, Table, Badge, Pagination, Dialog, Button, Text, Checkbox, Combobox } from 'evergreen-ui'
import { UserIcon, LogOutIcon, HomeIcon } from 'evergreen-ui'
//import {isMobile} from 'react-device-detect'
import LoadingComp from '../components/loading'
import Navbar from '../components/navbar'
import { adminService } from '@services/index'

// TODO: Por el momento se muestran 10 objetos por pagina, se puede usar una useState
// para poder modificar este numero y entregarlo dinamicamente a paginate() y setTotalPage(array, X, page) donde X sería el userState

function Travels(){
  const router = useRouter();
  const [pasajes, setPasajes] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showDetail, setShowDetail] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [travelSelected, setTravelSelected] = useState('')

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
          setTotalPage(Math.ceil(e.travels.length/10));
     } catch (e) {
         throw e
     }
   }
  function handleDetails(){
     //const diasjs = JSON.parse(t)
     if(travelSelected === ''){
       return(
         <></>
       )
     }else {

       function cbTravels(d, nd){
         if(d){
           return (
             <Checkbox checked label={nd}/>
           )
         }else {
           return (
             <Checkbox label={nd}/>
           )
         }
       }
       const stringdata = JSON.stringify(travelSelected);
       const parsedata = JSON.parse(stringdata);
       const { lunes, martes, miercoles, jueves, viernes, sabado, domingo } = JSON.parse(parsedata.dias)

       return(
         <>
         <Pane display='flex' justifyContent='space-around' alignItems='space-between'>
          <Strong color='muted'>Origen</Strong>
          <Strong color='muted'>Destino</Strong>
         </Pane>
         <Pane display='flex' justifyContent='space-around' alignItems='space-between'>
          <Text color='muted'>{travelSelected.origen}</Text>
          <Text color='muted'>{travelSelected.destino}</Text>
         </Pane>
         <Pane display='flex' justifyContent='space-around' alignItems='space-between' marginTop='20'>
          <Strong color='muted'>Costo Viaje</Strong>
          <Strong color='muted'>Hora Salida</Strong>
         </Pane>
         <Pane display='flex' justifyContent='space-around' alignItems='space-between'>
          <Text color='muted'>${travelSelected.costoViaje}</Text>
          <Text color='muted'>{travelSelected.horaSalida} Hrs.</Text>
         </Pane>
         <Pane marginTop='20'>
          <Strong color='muted'>Días que se realiza el viaje</Strong>
         </Pane>
         <Pane display='flex' justifyContent='space-around' flexDirection='row' >
            {cbTravels(lunes, 'Lunes')}{cbTravels(martes, 'Martes')}{cbTravels(miercoles, 'Miercoles')}{cbTravels(jueves, 'Jueves')}{cbTravels(viernes, 'Viernes')}
            {cbTravels(sabado, 'Sabado')}{cbTravels(domingo, 'Domingo')}
         </Pane>
         <Pane display='flex' justifyContent='space-around' marginTop='10'>
          <Strong color='muted'>ID Maquina</Strong>
          <Strong color='muted'>Límite de Pasajeros</Strong>
         </Pane>
         <Pane display='flex' marginTop='10px' flexDirection='row' justifyContent='space-between' alignItems='center'>
          <Pane >
          <Text marginLeft={60} color='muted'>Patente: HR-87VG</Text>
          </Pane>
          <Pane marginRight={120}>
          <Text color='muted' >{travelSelected.limitePasajeros}</Text>
          </Pane>
         </Pane>
         </>
       )
     }
   }

  function travelDetail(t){
    return (
            <Dialog isShown={showDetail} title="Detalles de Viaje"
              onCloseComplete={() => setShowDetail(false)}
              confirmLabel="Editar"
            >
            {handleDetails(travelSelected)}
            </Dialog>
        )
  }
  function showPanelDet(t){
    setTravelSelected(t)
    setShowDetail(true)
  }

  useEffect(() => {
    //handleLoad();
      adminService.getTravels().then(x => handleLoad(x)).catch((error) => {
        toaster.danger(error)
      })
  }, []);

  return(
    <>
    <Pane justifyContent='center' display='flex' marginTop={20}>
    <Heading size={800}>
      Viajes en venta
    </Heading>
    </Pane>
    {/*pasajes */}
    <Pane display='flex'  flexDirection='column' alignItems='center' justifyContent='start' paddingTop='2%'>
      <Card elevation={1} width='80%'>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell >Origen</Table.TextHeaderCell>
            <Table.TextHeaderCell >Destino</Table.TextHeaderCell>
            <Table.TextHeaderCell >Costo Viaje</Table.TextHeaderCell>
            <Table.TextHeaderCell >Limite Pasajeros</Table.TextHeaderCell>
            <Table.TextHeaderCell >Hora Salida</Table.TextHeaderCell>
            <Table.TextHeaderCell >ID Maquina</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height='auto' width='100%'>
            {isLoading ? <LoadingComp /> : ( paginate(pasajes.travels,10,page).map((p) =>
              <Table.Row isSelectable key={p.idtravel} onSelect={() => showPanelDet(p)}>
              <Table.TextCell>{p.origen}</Table.TextCell>
                <Table.TextCell>{p.destino}</Table.TextCell>
                <Table.TextCell>${p.costoViaje}</Table.TextCell>
                <Table.TextCell>{p.limitePasajeros}</Table.TextCell>
                <Table.TextCell>{p.horaSalida} Hrs.</Table.TextCell>
                <Table.TextCell>{p.idMaquina}</Table.TextCell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Pane justifyContent='end' display='flex' flexDirection='column' height='34vh'>
        <Pagination page={page} onPageChange={handlePageChange} totalPages={totalPage}></Pagination>
      </Pane>

    </Pane>
    {travelDetail(travelSelected)}
    </>
  )
}

export default Travels;
