import {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Pane, Card, Strong, toaster, Heading, IconButton, CrossIcon, Table, Badge, Pagination  } from 'evergreen-ui'
import { UserIcon, LogOutIcon, HomeIcon } from 'evergreen-ui'
//import {isMobile} from 'react-device-detect'
import LoadingComp from '../components/loading'
import Navbar from '../components/navbar'
import { userService } from '@services/index'

// TODO: Por el momento se muestran 10 objetos por pagina, se puede usar una useState
// para poder modificar este numero y entregarlo dinamicamente a paginate() y setTotalPage(array, X, page) donde X sería el userState

function UserTickets(){
  const router = useRouter();
  const [pasajes, setPasajes] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

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
          setTotalPage(e.pasajes.length/10);
     } catch (e) {
         throw e
     }
   }

  useEffect(() => {
    //handleLoad();
      userService.getTickets().then(x => handleLoad(x)).catch((error) => {
        toaster.danger(error)
      })
  }, []);

  return(
    <>
    {/*Navbar*/}
    <Pane display='flex' flexDirection='row' justifyContent='space-between' width={'100%'}>
      <IconButton icon={HomeIcon} height={48} marginTop={18} marginLeft={20} onClick={() => router.push('/')}/>
      <Navbar />
    </Pane>
    <Pane display='flex'  flexDirection='column' height='100vh' alignItems='center'>
      <Card elevation={1} width='80%'>
        <Strong>Mis Pasajes</Strong>
        <Table>
          <Table.Head>
            <Table.SearchHeaderCell />
            <Table.TextHeaderCell marginLeft={0} >Origen</Table.TextHeaderCell>
            <Table.TextHeaderCell >Destino</Table.TextHeaderCell>
            <Table.TextHeaderCell >Hora</Table.TextHeaderCell>
            <Table.TextHeaderCell >Costo</Table.TextHeaderCell>
            <Table.TextHeaderCell >Estado</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height='auto' width='100%'>
            {isLoading ? <LoadingComp /> : ( paginate(pasajes.pasajes,10,page).map((p) =>
              <Table.Row key={p.idTicket}>
              <Table.TextCell>{p.nroAsiento}</Table.TextCell>
                <Table.TextCell>{p.fecha}</Table.TextCell>
                <Table.TextCell>{p.origen}</Table.TextCell>
                <Table.TextCell>{p.destino}</Table.TextCell>
                <Table.TextCell>{p.horaSalida} Hrs.</Table.TextCell>
                <Table.TextCell>${p.costoViaje}</Table.TextCell>
                <Table.TextCell>
                <Pane flexBasis={120} >
                  <Badge color="green">COMPLETADO</Badge>
                </Pane>
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Pagination page={page} onPageChange={handlePageChange} totalPages={totalPage}></Pagination>
    </Pane>
    </>
  )
}

export default UserTickets;
