import {useState, useEffect} from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, Combobox, FormField, Table, SideSheet, Heading } from 'evergreen-ui';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from  'date-fns/locale/es';
registerLocale('es', es);

function Loading(){
  return(
    <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
      <Spinner />
    </Pane>
  )
}

function Tickets(){
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [isLoadingList, setLoadingList] = useState(true);
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState({dia: '', mes:'', ano:'', diaSemana:''});
  const [origenForm, setOrigenForm] = useState([]);
  const [travels, setTravels] = useState('');
  const [origenSelec, setOrigenSelec] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [isShown, setIsShown] = useState(false);

  const handleBuscarViaje = async (e) => {
      e.preventDefault();
      //const token = getCookie('token');
    try {
        if(origen !== destino){
          parseDay(startDate);
          const res = await fetch('api/tickets', {
            body:JSON.stringify({
              origen: origen,
              destino: destino,
              horaSalida: hora,
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
            //console.log(travels);
            travels.data.map((travel) => console.log(travel.origen));
          }
        }else {
          toaster.danger('Origen y Destino deben ser diferentes');
        }
           //router.push("/login");
    } catch (error) {
      toaster.danger(error.message);
    } finally {
      setLoadingList(false);
      setIsShown(true);
    }
  };
  const handleLoad = async (e) => {
      //e.preventDefault();
      //const token = getCookie('token');
      //if(!token) {router.push('/login')
      //Origenes y Destinos de travels
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
          loadComboBox(result, origenForm);
          //console.log(JSON.stringify(result.origen));
          if(result.code === 500){
            toaster.danger(result.message)
            //router.push('/login');
          }else if (result.code == 200) {
            toaster.success(result.message);
            //router.push('/login');
          }
           //router.push("/login");
    } catch (error) {
      toast.danger(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handlechangeFecha = async (e) => {
    setFecha(e.target.value)
    //console.log(e.target.id);
  };
  const handlechangeHora = async (e) => {
    setHora(e.target.value)
    //console.log(e.target.id);
  };

  function loadComboBox(result, cbData){
    result.origen.map((origen) => origenForm.push(origen.origen));
  }
  function parseDay(startDate){
    const nombreDia = startDate.getDay();
    if(nombreDia === 1){fecha.diaSemana = 'lunes'}
    if(nombreDia === 2){fecha.diaSemana = 'martes'}
    if(nombreDia === 3){fecha.diaSemana = 'miercoles'}
    if(nombreDia === 4){fecha.diaSemana = 'jueves'}
    if(nombreDia === 5){fecha.diaSemana = 'viernes'}
    if(nombreDia === 6){fecha.diaSemana = 'sabado'}
    if(nombreDia === 0){fecha.diaSemana = 'domingo'}
    //console.log(fecha.diaSemana);
  }
  function TableTickets(dataTravel){
    //console.log(travels);
    return(
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell marginLeft={-30}>Origen</Table.TextHeaderCell>
          <Table.TextHeaderCell marginLeft={-110}>Destino</Table.TextHeaderCell>
          <Table.TextHeaderCell marginLeft={-110}>Costo</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height='auto' width='auto' marginLeft={50}>
          {isLoadingList ? <Loading /> : ( travels.data.map((travel) =>
            <Table.Row key={travel.idtravel} >
              <Table.TextCell>{travel.horaSalida}</Table.TextCell>
              <Table.TextCell>{travel.origen}</Table.TextCell>
              <Table.TextCell>{travel.destino}</Table.TextCell>
              <Table.TextCell>{travel.costoViaje}</Table.TextCell>
              <Table.TextCell>
              <Button appearance='primary' intent='danger' display='flex' onClick={() => setIsShown(true)}>Comprar</Button>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
  function PanelLateral(){
    return (
      <SideSheet isShown={isShown} onCloseComplete={() => setIsShown(false)} preventBodyScrolling containerProps={{display: 'flex', flex: '1', flexDirection: 'column'}}>
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Viajes disponibles</Heading>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Card backgroundColor="white" elevation={0} height='auto' width='auto'>
            {TableTickets(travels)}
          </Card>
        </Pane>
      </SideSheet>
    )
  }

  useEffect(() => {
      handleLoad();
      //loadComboBox();
  }, []);

    return(
      <>
      {isLoading ? <Loading /> :(
        <Pane width='100%' height='100vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
          <form onSubmit={handleBuscarViaje}>
          {/*Login form*/}
            <Card elevation={1} height={350} width='100%' border="default" padding={30} display='flex' flexDirection='column' alignItems='center'>
              {/*Title*/}
                  <Strong size={600} marginTop={10}>Buscar Pasaje</Strong>
                  {/*Input Name*/}
                  <Combobox openOnFocus items={origenForm} onChange={selected => setOrigen(selected)} placeholder='Origen' marginTop={20} width='100%' />
                  <Combobox openOnFocus items={['Antofagasta','Tocopilla', 'Maria Elena']} onChange={selected => setDestino(selected)} placeholder='Destino' marginTop={10} marginBottom={10} width='100%' />
                  <DatePicker locale='es' selected={startDate} onChange={(date) => setStartDate(date)} customInput={<TextInput />} isClearable placeholderText="Selecciona una fecha" />
                  {/*Input Last name*/}
                  <TextInput name='hora' placeholder='Hora' type='text' onChange={handlechangeHora} value={hora} maxLength='15' marginTop={10} pattern='[0-9]{1,4}' title='Solo números' required />
                  {/*Login Button*/}
                  <Button appearance='primary'  display='flex' marginTop={20} type='submit'>Buscar Viajes</Button>
            </Card>
          </form>
          <Toaster />
        </Pane>
      )}
      {PanelLateral()}
      < />
    )
}

export default Tickets
