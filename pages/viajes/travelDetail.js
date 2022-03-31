import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph  } from 'evergreen-ui';
import LoadingComp from '../components/loading';
import Navbar from '../components/navbar';
import HomeButton from '../components/homeButton';
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon, ArrowRightIcon, ArrowLeftIcon } from 'evergreen-ui';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import asientoBlank from '../../public/iconseat.png'
import asientoSelec from '../../public/iconseatSelected.png'
import DatePicker, {registerLocale} from 'react-datepicker'

function setHourPoint(hour){
  const str = hour.toString().slice(0, 2)+':'+hour.toString().slice(2, 4);
  return (str)
}

function TravelDetail(travelData){
  const [isLoading, setIsLoading] = useState(true);
  const [dataTravel, setDataTravel] = useState('');
  const [seatControl, setSeatControl] = useState(Array(40));
  const [seatSelected, setSeatSelected] = useState('');
  const [fechaSelect, setFechaSelect] = useState('');
  const handleLoad = async (e) => {
      //Intentamos obtener origenes disponibles
    try {
            //Guarda datos recibidos
            setDataTravel(travelData.travelData.info);
            setFechaSelect(travelData.travelData.fecha);
            ///setFechaSelect(prueba);
            console.log(travelData.travelData);

    } catch (error) {
      toaster.danger(error.message);
    } finally {
      setIsLoading(false);
    }
  };

function seatPack(i){
  //Cambia el icono dependiendo si está seleccionado o no
  if(i === seatSelected){
    return (
      <>
        <Text>{i<9 ? `0${i+1}` : i+1}</Text>
        <Image key={i.x} src={asientoSelec} width={48} height={48} fill={'red'} />
      </>
    )
  }else {
    return(
      <>
        <Text>{i<9 ? `0${i+1}` : i+1}</Text>
        <Image key={i.x} src={asientoBlank} width={48} height={48} fill={'red'} />
      </>
    )
  }
}
function seleccionarAsiento(i){
  //Guarda el asiento selecciona, si se selecciona el mismo lo limpia
  if(i === seatSelected) {
    setSeatSelected('');
  }else {
    setSeatSelected(i);
  }
}

  useEffect(() => {
      handleLoad();
  }, []);

  return(
    <>
    {isLoading ? <LoadingComp /> : (
      <Pane border='default' display='flex' width='100%' height='90vh' flexDirection='column'>
      {/*Detalles de viajes seleccionado*/}
        <Pane flexDirection='row' display='flex'>
          <Card elevation={1} height={140} width={'50%'} border="default" margin={10} padding={10} display='flex' flexDirection='column' alignItems='center'>
            {/*Title*/}
            <Strong size={600} marginTop={10}>Trayectoria</Strong>
            {/*origen*/}
            <Pane display='flex' flexDirection='row' justifyContent='space-around' marginTop={20} width={'100%'}>
              <Pane display='flex' flexDirection='column' alignItems='center'>
                <Strong>Origen</Strong>
                <Text>{dataTravel.origen}</Text>
              </Pane>
              <ArrowRightIcon size={24} marginTop={10} />
            {/*destino*/}
              <Pane display='flex' flexDirection='column' alignItems='center'>
                <Strong>Destino</Strong>
                <Text>{dataTravel.destino}</Text>
              </Pane>
            </Pane>
          </Card>
          <Card elevation={1} height={140} width={'50%'} border="default" margin={10} padding={10} display='flex' flexDirection='column' alignItems='center'>
            <Strong size={600} marginTop={10}>Detalles</Strong>
            {/*detalles*/}
            <Pane display='flex' flexDirection='row' justifyContent='space-around' marginTop={20} width={'100%'}>
              <Pane display='flex' flexDirection='column' alignItems='center'>
                <Strong>Hora de Salida</Strong>
                <Text>{setHourPoint(dataTravel.horaSalida)}</Text>
              </Pane>
            {/*destino*/}
              <Pane display='flex' flexDirection='column' alignItems='center'>
                <Strong>Costo de Pasaje</Strong>
                <Text>${dataTravel.costoViaje}</Text>
              </Pane>
            </Pane>
          </Card>
        </Pane>
         <Card elevation={1} alignItems='center' display='flex' height={'100%'} width={'90%'} marginLeft={28} marginTop={20} flexDirection='column'>
          <Strong size={600} marginTop={20} marginBottom={30}>Seleccione un Asiento disponible</Strong>

               <Pane display='flex' justifyContent='space-around'>
                 <Pane display='flex' flexDirection='row' flexWrap='wrap' width={'50%'} >
                   {Array.apply(null, seatControl).map((x, i) =>
                     <Card key={i.toString()} onClick={() => seleccionarAsiento(i)}>
                       {seatPack(i)}
                     </Card>
                   )}
                </Pane>
                <Pane display='flex' flexDirection='column' alignItems='center'>
                  <Text marginTop={40}>Nº seleccionado</Text>
                  <Heading color='muted' size={900} marginTop={10}>{seatSelected === '' ? 0 : seatSelected+1}</Heading>
                  <Button appearance='primary' marginTop={330}>Comprar</Button>
                  <Button appearance='primary' iconAfter={ArrowLeftIcon} intent='danger' marginTop={10}>Volver</Button>
                </Pane>
               </Pane>


         </Card>
      </Pane>
    )}
    </>
  )
}
  export default TravelDetail;
