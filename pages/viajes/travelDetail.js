import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph  } from 'evergreen-ui';
import LoadingComp from '../components/loading';
import Navbar from '../components/navbar';
import HomeButton from '../components/homeButton';
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon, ArrowRightIcon, ArrowLeftIcon } from 'evergreen-ui';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import seatBlank from '../../public/iconseat.png'

function TravelDetail(travelData){
  const [isLoading, setIsLoading] = useState(true);
  const [dataTravel, setDataTravel] = useState('');
  const [seatControl, setSeatControl] = useState(Array(40));
  const handleLoad = async (e) => {
      //Intentamos obtener origenes disponibles
    try {
            //Guarda datos recibidos
            setDataTravel(travelData.travelData);
            //console.log(travelData)

    } catch (error) {
      toaster.danger(error.message);
    } finally {
      setIsLoading(false);
    }
  };

function seatPack(cantidad){
  console.log('la media volada')
}

  useEffect(() => {
      handleLoad();
  }, []);

  return(
    <>
    {isLoading ? <LoadingComp /> : (
      <Pane border='default' display='flex' width='100%' height='90vh' flexDirection='column'>
        <Pane flexDirection='row' display='flex'>
          {/*Detalles de viajes seleccionado*/}
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
                <Text>{dataTravel.horaSalida}</Text>
              </Pane>
            {/*destino*/}
              <Pane display='flex' flexDirection='column' alignItems='center'>
                <Strong>Costo de Pasaje</Strong>
                <Text>${dataTravel.costoViaje}</Text>
              </Pane>
            </Pane>
          </Card>
        </Pane>
        <Pane>
         <Card elevation={1} justifyContent='center' alignItems='center' display='flex' height={'67vh'} flexDirection='column'>
          <Strong size={600} marginBottom={20}>Seleccione un Asiento disponible</Strong>
            <Pane display='block' width={260} marginLeft={-200}>
            {Array.apply(null, seatControl).map((x, i) =>
              <>
              <Text>{i<9 ? `0${i+1}` : i+1}</Text>
              <Image key={i.x} src={seatBlank} width={48} height={48} />
              </>
            )}
            <Pane marginLeft={400} marginTop={-40}>
              <Button>Comprar</Button>
            </Pane>
            </Pane>
         </Card>
        </Pane>
      </Pane>
    )}
    </>
  )
}
  export default TravelDetail;
