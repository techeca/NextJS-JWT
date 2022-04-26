import {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Pane, Card, Strong, toaster, Heading, IconButton, CrossIcon, Table, Badge, Pagination, Dialog, Button, Text, Checkbox, Combobox, Paragraph } from 'evergreen-ui'
import { UserIcon, LogOutIcon, HomeIcon } from 'evergreen-ui'
//import {isMobile} from 'react-device-detect'
import LoadingComp from '../components/loading'
import Navbar from '../components/navbar'
import { adminService } from '@services/index'

// TODO: Por el momento se muestran 10 objetos por pagina, se puede usar una useState
// para poder modificar este numero y entregarlo dinamicamente a paginate() y setTotalPage(array, X, page) donde X sería el userState

function Dashboard(){
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    //handleLoad();
      //adminService.getTravels().then(x => handleLoad(x)).catch((error) => {
      ///  toaster.danger(error)
    //  })
  }, []);

  return(
    <>
    <Pane justifyContent='center' display='flex' marginTop={30}>
    <Heading size={800}>
      Dashboard
    </Heading>
    </Pane>
    {/*pasajes */}
    <Pane >
    <Pane borderRadius={30} display='flex'  flexDirection='column' height='85vh' alignItems='center' justifyContent='start' paddingTop='3%'>
      <Card elevation={0} border='default' width='80%'>
        <Pane display='flex' flexDirection='row' justifyContent='space-between' margin={20}>
          <Heading color='muted' size={500}>Total de Viajes en Venta</Heading>
          <Heading marginLeft={15} color='muted' size={600}>3</Heading>
        </Pane>
      </Card>
      <Card elevation={0} border='default' width='80%' marginTop={30}>
        <Pane display='flex' flexDirection='row' justifyContent='space-between' margin={20}>
          <Heading color='muted' size={500}>Total de Usuario Registrados</Heading>
          <Heading marginLeft={15} color='muted' size={600}>7</Heading>
        </Pane>
      </Card>
      <Card elevation={0} border='default' width='80%' marginTop={30}>
        <Pane display='flex' flexDirection='row' justifyContent='space-between' margin={20}>
          <Heading color='muted' size={500}>Total de Pasajes Comprados</Heading>
          <Heading marginLeft={15} color='muted' size={600}>65</Heading>
        </Pane>
      </Card>
      <Card elevation={0} border='default' width='80%' marginTop={30}>
        <Pane display='flex' flexDirection='row' justifyContent='space-between' margin={20}>
          <Heading color='muted' size={500}>Total de Buses Registrados</Heading>
          <Heading marginLeft={15} color='muted' size={600}>none</Heading>
        </Pane>
      </Card>

      <Pane display='flex' flexDirection='row' marginTop={20}>
      <Card elevation={0} border='default' width='100%' margin={30}>
        <Pane display='flex' flexDirection='column' alignItems='center' margin={20}>
          <Heading color='muted' size={500}>Viaje más comprado</Heading>
          <Heading margin={10} color='muted' size={600}>Desde: Antofagasta Hacias: Tocopilla</Heading>
        </Pane>
      </Card>
      <Card elevation={0} border='default' width='100%' margin={30}>
        <Pane display='flex' flexDirection='column' alignItems='center' margin={20}>
          <Heading color='muted' size={500}>Ciudad más solicitada</Heading>
          <Heading margin={10} color='muted' size={600}>Antofagasta</Heading>
        </Pane>
      </Card>
      <Card elevation={0} border='default' width='100%' margin={30}>
        <Pane display='flex' flexDirection='column' alignItems='center' margin={20}>
          <Heading color='muted' size={500}>Usuarios VIP</Heading>
          <Heading margin={10} color='muted' size={600}>none</Heading>
        </Pane>
      </Card>
      </Pane>

    </Pane>
    </Pane>

    </>
  )
}

export default Dashboard;
