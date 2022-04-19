import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, Combobox, FormField, Table, SideSheet, Heading, Position, IconButton } from 'evergreen-ui'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'
import "react-datepicker/dist/react-datepicker.css"
import Navbar from '../components/navbar'
import LoadingComp from '../components/loading'
import TravelDetail from './travelDetail'
import TicketsOrder from './ticketsOrder'
import TableTickets from './tableTickets'
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon } from 'evergreen-ui'
import { userService, travelsService } from '@services/index'
import DatePicker, {registerLocale} from 'react-datepicker'
import es from  'date-fns/locale/es'
registerLocale('es', es)

function setHourPoint(hour){
  const str = hour.toString().slice(0, 2)+':'+hour.toString().slice(2, 4);
  return (str)
}

function Tickets(){
  //NECESARIO PARA MOSTRAR FORM Y CARGARLO
  const router = useRouter()
  const [isLoading, setLoading] = useState(true) //Carga de pagina
  const [startDate, setStartDate] = useState(new Date()) //Para guardar fecha de DatePicker
  const [origenForm, setOrigenForm] = useState([]) //Todos los origenes
  const [destinoForm, setDestinoForm] = useState([]) //Todos los destinos
  const [origen, setOrigen] = useState('') //Origen seleccionado por el usuario
  const [destino, setDestino] = useState('') //Destino seleccionado por el usuario

  //CONTROL DE PANELES
  const [isLoadingList, setLoadingList] = useState(true) //carga de lista de viajes
  const [isShown, setIsShown] = useState(false); // activa/desactiva panel de viajes general y detalles
  const [controlTravelInfo, setControlTravelInfo] = useState(false) //Controla si es que muestra Los viajes (despues de filtro) o el detalle del viaje seleccionado

  //NECESARIO PARA BUSQUEDA DE VIAJES SEGUN ORIGEN, DESTINO Y FECHA (DIA DE LA SEMANA)
  const [fecha, setFecha] = useState({dia: '', mes:'', ano:'', diaSemana:''}) //El unico que esta funcionando es diaSemana (lunes o martes, etc) para comparar con los viajes obtenidos de BD // falta implementar el resto
  const [travels, setTravels] = useState('')  //viajes obtenidos despues de la busqueda
  const handleBuscarViaje = async (e) => {
        e.preventDefault();
        //Origen y destino deben ser distintos
        if(origen !== destino){
          //Obtenemos el dia de la semana ex: lunes, martes, miercoles, etc
          //Obtiene la fecha seleccionada del DatePicker
          parseDay(startDate)
          //Solicitamos los travels(viajes) con los criterios entregados por el usuario
            travelsService.getAllTravels(origen, destino, fecha)
              .then((x) => {
                  //Guarda los resultados en travels desactiva el loading del panel y muestra el panel ex: setData>setloading(false)>setShow(true)
                  setTravels(x.data)
                  setLoadingList(false);
                  setIsShown(true);
              })
              .catch(error => {
                toaster.danger(error);
              })
    }else {
      toaster.danger('Origen y Destino deben ser diferentes');
    }
  }

  //NECESARIO PARA DETALLE DE VIAJE
  const [travelSelected, setTravelSelected] = useState({info:'', fecha:'', nroAsiento:'', code:''})  //Guardar la seleccion del usuario y lo envia al componente travel
  //const [origenSelec, setOrigenSelec] = useState(''); //falta implementar // al seleccionar un origen se debe buscar los destino disponibles

  //NECESARIO PARA CARRITO DE TICKETS
  const [carritoTickets, setCarritoTickets] = useState([]) //Guarda los pasajes que quiere comprar el usuario
  //Solicita origenes/destinos y los carga
  const handleLoad = async (e) => {
    try {
            loadComboBox(e)
    } catch (error) {
      toaster.danger(error)
    }
  }
  function loadComboBox(result){
    //Agrega los objetos 1 vez
    if(origenForm.length>0){
      //console.log('hay objetos')
    }else {
      result.origenes.map((origen) => origenForm.push(origen.origen));
      result.destinos.map((destino) => destinoForm.push(destino.destino));
    }
  }
  //Componente de Panel derecho, muestra Viajes disponibles y al seleccionar uno muestra los detalles
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
            {controlTravelInfo ? <TravelDetail travelData={travelSelected} parentCallBack={handleCallBack}/> : <TableTickets travels={travels} isLoadingList={isLoadingList} showTravelDetail={showTravelDetail} />}
          </Card>
        </Pane>
      </SideSheet>
    )
  }

  //Funcion para mostrar/guardar los detalles del pasaje seleccionado por el usuario
  const showTravelDetail = async (travel) => {
    travelSelected.info = travel;
    parseFechaNorm(startDate.getDate(), startDate.getMonth(), startDate.getFullYear());
    //setTravelSelected(travel);
    setControlTravelInfo(true);
  }

  //Helpers
  function hideTravelDetail(){
      setControlTravelInfo(false);
      setIsShown(false);
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
  function parseFechaNorm(dia, mes, ano){
    var diaN = dia.toString()
    var mesN = mes+1
    if(dia < 10){diaN = `0${diaN}`}else{diaN = dia}
    if(mes < 10){mesN = `0${mesN}`}else{mesN = mes}
    travelSelected.fecha = `${diaN}`+`${mesN}`+`${ano}`
  }
  //para carrito
  const handleCallBack = async (e, f, g, h) =>{
    //validamos que no existan mas de 5 Pasajes //contamos desde 0
    if(carritoTickets.length > 4){
      toaster.danger('Carrito lleno!')
    }else {
      //todavia tenemos espacio
      //console.log(e, f, g);
      const newTicket = {info:'', fecha:'', nroAsiento:'', code:''};
      newTicket.info = e;
      newTicket.fecha = f;
      newTicket.nroAsiento = g;
      newTicket.code = h;
      const newCarr = carritoTickets;
      newCarr.push(newTicket);
      setCarritoTickets(newCarr);
      setControlTravelInfo(false);
      setIsShown(false);
      setLoadingList(true);
      toaster.success('Pasaje agregado')
    }

  }
  const rmvElmt = async (carritoTry) => {
    const neeCarr = carritoTry;
    setCarritoTickets(neeCarr);
  }

  useEffect(() => {
      travelsService.getAllTravelsName().then(e => handleLoad(e)).then(setLoading(false))
  }, [])

    return(
      <>
      {isLoading ? <LoadingComp /> :(
        <>
        {/*Navbar*/}
        <Pane display='flex' flexDirection='row' justifyContent='space-between' width={'100%'}>
          <IconButton icon={HomeIcon} height={48} marginTop={18} marginLeft={20} onClick={() => router.push('/')}/>
          <Navbar />
        </Pane>
        <Pane background='tint1' width='100%' height='90vh' border='default' display='flex' flexDirection='column' justifyContent='space-around'>
        {/*Panel de pasajes que se quiere comprar*/}
          <Pane display='flex' flexDirection='row' justifyContent='space-around'>
          {/*Primer bloque*/}
              <Pane background='white' marginTop={-60}>
              {/*<TicketsOrder carrito={carritoTickets}/>*/}
              {carritoTickets.length > 0 ? <TicketsOrder carrito={carritoTickets} rmvElmt={rmvElmt}/> : <></>}
              </Pane>
          {/*Segundo bloque*/}
              <Pane>
                <form onSubmit={handleBuscarViaje}>
                {/*Buscar viajes form*/}
                  <Card background='white' elevation={1} height={350} width='100%' border="default" padding={30} display='flex' flexDirection='column' alignItems='center'>
                    {/*Title*/}
                        <Strong size={600} marginTop={10}>Buscar Viajes</Strong>
                        {/*Combox origen y destino*/}
                        <Combobox openOnFocus items={origenForm} onChange={selected => setOrigen(selected)} placeholder='Origen' marginTop={20} width='100%' />
                        <Combobox openOnFocus items={destinoForm} onChange={selected => setDestino(selected)} placeholder='Destino' marginTop={10} marginBottom={10} width='100%' />
                        <DatePicker locale='es' selected={startDate} onChange={(date) => setStartDate(date)} customInput={<TextInput />} isClearable placeholderText="Selecciona una fecha" />
                        {/*Input hora*/}
                        {/*<TextInput name='hora' placeholder='Hora' type='text' onChange={handlechangeHora} value={hora} maxLength='15' marginTop={10} pattern='[0-9]{1,4}' title='Solo números' />*/}
                        {/*Login Button*/}
                        <Button appearance='primary' display='flex' marginTop={20} type='submit'>Buscar Viajes</Button>
                  </Card>
                </form>
              </Pane>
          {/*Tercer bloque*/}
              <Pane background='white' >

              </Pane>
          </Pane>
        </Pane>
        </>
      )}
      {PanelLateral()}
      < />
    )
}

export default Tickets
