import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, Combobox, FormField, Table, SideSheet, Heading, Position, IconButton } from 'evergreen-ui'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'
import DatePicker, {registerLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import es from  'date-fns/locale/es'
import Navbar from './components/navbar'
import LoadingComp from './components/loading'
import TravelDetail from './viajes/travelDetail'
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon } from 'evergreen-ui'
registerLocale('es', es);

function setHourPoint(hour){
  const str = hour.toString().slice(0, 2)+':'+hour.toString().slice(2, 4);
  return (str)
}

function Tickets(){
  const router = useRouter();
  const [isLoading, setLoading] = useState(true); //carga de pagina
  const [isLoadingList, setLoadingList] = useState(true); //carga de lista de viajes
  const [startDate, setStartDate] = useState(new Date()); //para obtener fecha
  const [isShown, setIsShown] = useState(false); // activa/desactiva panel de viajes encontrados
  const [origenForm, setOrigenForm] = useState([]); //resultado de select origen from travels

  const [origen, setOrigen] = useState(''); //Guarda el origen seleccionado
  const [destino, setDestino] = useState(''); //Guarda el destino seleccionado
  const [fecha, setFecha] = useState({dia: '', mes:'', ano:'', diaSemana:''}); //El unico que esta funcionando es diaSemana (lunes o martes, etc) para comparar con los viajes obtenidos de BD // falta implementar el resto

  const [travels, setTravels] = useState('');  //viajes obtenidos despues de la busqueda
  const [origenSelec, setOrigenSelec] = useState(''); //falta implementar // al seleccionar un origen se debe buscar los destino disponibles // actualmente origen y destino vienen del mismo resultado
  const [travelSelected, setTravelSelected] = useState ('');
  const [controlTravelInfo, setControlTravelInfo] = useState (false);

  const handleLoad = async (e) => {
      //Intentamos obtener origenes disponibles
    try {
          const res = await fetch('api/tickets', {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'GET'
          })
          //Guarda los datos de origenes obtenidos
          const result = await res.json();
          //Se cargan en ComboBox

//
          if(result.code === 500){
            toaster.danger(result.message)
          }else if (result.code == 200) {
            //Imprime resultado de origenes, ¿es necesario? //imp: Datos obtenidos
            //toaster.success(result.message);
            loadComboBox(result, origenForm);
          }
    } catch (error) {
      toaster.danger(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleBuscarViaje = async (e) => {
      e.preventDefault();
    try {
        if(origen !== destino){
          parseDay(startDate);
          const res = await fetch('api/tickets', {
            body:JSON.stringify({
              origen: origen,
              destino: destino,
              fecha: fecha
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          })

          const result = await res.json();
          const stringdata = JSON.stringify(result.data);
          const parsedata = JSON.parse(stringdata);
          setTravels(result);

          if(result.code === 500){
            toaster.danger(result.message);
            //router.push('/login');
          }else if (result.code == 200) {
            toaster.success(result.message);
            setLoadingList(false);
            setIsShown(true);
            //travels.data.map((travel) => console.log(travel.origen));
          }
        }else {
          toaster.danger('Origen y Destino deben ser diferentes');
        }
           //router.push("/login");
    } catch (error) {
      toaster.danger(error.message);
    }
  };

  function showTravelDetail(travel){
    setTravelSelected(travel);
    setControlTravelInfo(true);
  }
  function hideTravelDetail(){
      setControlTravelInfo(false);
      setIsShown(false);
  }
  function loadComboBox(result, cbData){
    //setOrigenForm([]);
    if(origenForm.length>0){
      console.log('hay objetos')
    }else {
      result.origen.map((origen) => origenForm.push(origen.origen));
    }
  }
  function parseDay(startDate){
    //Obtiene el dia entregado por el component de fecha y retorna que dia es en string :P
    const nombreDia = startDate.getDay();
    if(nombreDia === 1){fecha.diaSemana = 'lunes'}
    if(nombreDia === 2){fecha.diaSemana = 'martes'}
    if(nombreDia === 3){fecha.diaSemana = 'miercoles'}
    if(nombreDia === 4){fecha.diaSemana = 'jueves'}
    if(nombreDia === 5){fecha.diaSemana = 'viernes'}
    if(nombreDia === 6){fecha.diaSemana = 'sabado'}
    if(nombreDia === 0){fecha.diaSemana = 'domingo'}
  }
  function TableTickets(dataTravel){
    //console.log(travels);
    return(
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell marginLeft={-50}>Origen</Table.TextHeaderCell>
          <Table.TextHeaderCell marginLeft={-110}>Destino</Table.TextHeaderCell>
          <Table.TextHeaderCell marginLeft={-100}>Costo</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height='auto' width='auto' marginLeft={30}>
          {isLoadingList ? <LoadingComp /> : ( travels.data.map((travel) =>
            <Table.Row key={travel.idtravel} >
              <Table.TextCell>{setHourPoint(travel.horaSalida)} Hrs.</Table.TextCell>
              <Table.TextCell>{travel.origen}</Table.TextCell>
              <Table.TextCell>{travel.destino}</Table.TextCell>
              <Table.TextCell>${travel.costoViaje}</Table.TextCell>
              <Table.TextCell>
              <Button appearance='primary' intent='danger' display='flex' onClick={() => showTravelDetail(travel)}>Detalles</Button>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
  function PanelLateral(){
    return (
      <SideSheet isShown={isShown} onCloseComplete={() => hideTravelDetail()} preventBodyScrolling containerProps={{display: 'flex', flex: '1', flexDirection: 'column'}}>
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Viajes disponibles</Heading>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Card backgroundColor="white" elevation={0} height='auto' width='auto'>
            {controlTravelInfo ? <TravelDetail travelData={travelSelected} /> : TableTickets(travels)}
          </Card>
        </Pane>
      </SideSheet>
    )
  }

  useEffect(() => {
      handleLoad();
  }, []);

    return(
      <>
      {isLoading ? <LoadingComp /> :(
        <>
        <Pane display='flex' flexDirection='row' justifyContent='space-between' width={'100%'}>
          <IconButton icon={HomeIcon} height={48} marginTop={18} marginLeft={20} onClick={() => router.push('/')}/>
          <Navbar />
        </Pane>
        <Pane width='100%' height='90vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
          <form onSubmit={handleBuscarViaje}>
          {/*Buscar viajes form*/}
            <Card elevation={1} height={350} width='100%' border="default" padding={30} display='flex' flexDirection='column' alignItems='center'>
              {/*Title*/}
                  <Strong size={600} marginTop={10}>Buscar Viajes</Strong>
                  {/*Combox origen y destino*/}
                  <Combobox openOnFocus items={origenForm} onChange={selected => setOrigen(selected)} placeholder='Origen' marginTop={20} width='100%' />
                  <Combobox openOnFocus items={origenForm} onChange={selected => setDestino(selected)} placeholder='Destino' marginTop={10} marginBottom={10} width='100%' />
                  <DatePicker locale='es' selected={startDate} onChange={(date) => setStartDate(date)} customInput={<TextInput />} isClearable placeholderText="Selecciona una fecha" />
                  {/*Input hora*/}
                  {/*<TextInput name='hora' placeholder='Hora' type='text' onChange={handlechangeHora} value={hora} maxLength='15' marginTop={10} pattern='[0-9]{1,4}' title='Solo números' />*/}
                  {/*Login Button*/}
                  <Button appearance='primary' display='flex' marginTop={20} type='submit'>Buscar Viajes</Button>
            </Card>
          </form>
        </Pane>
        </>
      )}
      {PanelLateral()}
      < />
    )
}

export default Tickets
