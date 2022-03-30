import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph  } from 'evergreen-ui';
import LoadingComp from '../components/loading';
import Navbar from '../components/navbar';
import HomeButton from '../components/homeButton';
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon } from 'evergreen-ui';


const TravelPresenter = ({travelResult, error, loading, router}) =>

  loading ? (<LoadingComp />) : (
    <>
    <Pane display='flex' flexDirection='row' justifyContent='space-between' width={'100%'}>
      <HomeButton />
      <Navbar />
    </Pane>
    <Pane width='100%' height='90vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
      {/*Detalles de viajes seleccionado*/}
      <form >
      <Card elevation={1} height={290} width={300} border="default" margin={10} padding={10} display='flex' flexDirection='column' alignItems='center'>
        {/*Title*/}
        <Strong size={600} marginTop={10}>Trayectoria</Strong>
        {/*origen*/}
        <Pane display='flex' flexDirection='row' justifyContent='space-around' marginTop={20} width={'100%'}>
          <Pane display='flex' flexDirection='column' alignItems='center'>
            <Strong>Origen</Strong>
            <Text>Antofagasta</Text>
          </Pane>
        {/*destino*/}
          <Pane display='flex' flexDirection='column' alignItems='center'>
            <Strong>Destino</Strong>
            <Text>Tocopilla</Text>
          </Pane>
        </Pane>
        <Strong size={500} marginTop={10}>Detalles</Strong>
        {/*origen*/}
        <Pane display='flex' flexDirection='row' justifyContent='space-around' marginTop={20} width={'100%'}>
          <Pane display='flex' flexDirection='column' alignItems='center'>
            <Strong>Hora de Salida</Strong>
            <Text>18:00</Text>
          </Pane>
        {/*destino*/}
          <Pane display='flex' flexDirection='column' alignItems='center'>
            <Strong>Costo de Pasaje</Strong>
            <Text>$6000</Text>
          </Pane>
        </Pane>
        {/*Button comprar y ver/seleccionar asiento*/}
        <Pane display='flex' flexDirection='row' marginTop={30} justifyContent='space-evenly'>
          <Button appearance='primary' type='submit'>Comprar</Button>
          <Button appearance='primary' marginLeft={10}>Seleccionar Asiento</Button>
        </Pane>
      </Card>
      </form>
    </Pane>
    </>
  );

  export default TravelPresenter;
