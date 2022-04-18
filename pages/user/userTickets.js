import {useState, useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph, Table, Badge, Pagination  } from 'evergreen-ui';
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon } from 'evergreen-ui'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'
import {isMobile} from 'react-device-detect'
import LoadingComp from '../components/loading'
import Navbar from '../components/navbar'
import { userService } from '../../services'

function parseToken(token) {
  if(!token){return;}
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function UserTickets(){
  const router = useRouter();
  const [pasajes, setPasajes] = useState('');
  const [pasajes2, setPasajes2] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sizexPage, setSizexPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  const handlePageChange = async (e) => {
    setPage(e);
  };
   const handleLoad = async (e) => {
       //e.preventDefault();
     try {
           //se guardan los pasajes obtenidos
           console.log(e)
           //console.log(prueba);
           //console.log(parseToken(result.data));
              if(e.pasajes.length > 0){
                setPasajes(e);
                setPasajes2(e);
                setTotalPage(e.pasajes.length/10+1);
              }
     } catch (error) {
       toast.error(error.message);
     } finally {
       setIsLoading(false);
     }
   };


  useEffect(() => {
    //handleLoad();
    userService.getTickets().then(x => handleLoad(x));
    //console.log(pasajes);
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
            {isLoading ? <LoadingComp /> : ( pasajes.pasajes.map((p) =>
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
