import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, Checkbox, FormField, toaster, Menu, PeopleIcon, SendToMapIcon, ArchiveIcon, BuggyIcon, SettingsIcon, HomeIcon } from 'evergreen-ui'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'
import { adminService } from '@services/index'
import NewTravel from './newTravel'
import Travels from './travels'
import Tickets from './tickets'
import Users from './users'
import Dashboard from './dashboard'
import Navbar from './navbar'

function CPanel(){
  const router = useRouter();
  const [pageSelected, setPageSelected] = useState('');
  const [semana, setSemana] = useState({
        lunes: false, martes: false, miercoles: false, jueves: false,
        viernes: false, sabado: false, domingo: false });
  const [datosViaje, setDatosViaje] = useState({
    origen: '', destino: '', costoViaje: '',
    limitePasajeros: '', horaSalida: '', })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(datosViaje.origen !== datosViaje.destino){
        if(datosViaje.limitePasajeros <= 40){
          if(!semana.lunes && !semana.martes && !semana.miercoles && !semana.jueves && !semana.viernes && !semana.sabado && !semana.domingo)
          {
            toaster.danger('Debe seleccionar 1 día mínimo')
          }else {
            //return adminService.newTravel(datosViaje, semana)
            return adminService.newTravel(datosViaje, semana)
              .then(() => {
                  toaster.success('Viaje nuevo ingresado')
              })
              .catch(error => {
                toaster.danger(error+' ')
              });
            }
        }else {
          toaster.danger('El límite de pasajeros debe ser 40 o menos');
        }
      }else {
        toaster.danger('Origen y Destino deben ser diferentes')
      }
    } catch (error) {
      toaster.danger(error.message);
    }
  };

  const handleCB = async (e) => {
    setSemana({...semana, [e.target.name]:e.target.checked})
  };
  const handleDatos = async (e) => {
    setDatosViaje({...datosViaje, [e.target.name]:e.target.value})
  };
  function handleContentCPanel (p){
    switch (p) {
      case 'pasajes':
        return (<Tickets />)
      case 'viajes':
        return (<Travels />)
      case 'usuarios':
        return (<Users />)
      case 'nuevoViaje':
        return (<NewTravel />)
      case 'dashboard':
        return (<Dashboard />)
      default:
        return (<Dashboard />)
    }
  }

  useEffect(() => {
    if(!adminService.adminValue){
      router.push('/admin/login')
    }
  });

  return (
    //container
    <>
    <Navbar />
    <Pane width='100%' height='90vh' border='default' display='flex' alignItems='center' flexDirection='row' justifyContent='center'>
      <Pane border='default' width='15%' height='90vh' justifyContent='start' flexDirection='column'>
        <Pane >
          <Menu.Group title='CPanel'>
            <Menu.Item icon={HomeIcon} onSelect={() => setPageSelected('dashboard')}>Home</Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={SendToMapIcon} onSelect={() => setPageSelected('viajes')}>Viajes</Menu.Item>
              {pageSelected === 'viajes' || pageSelected === 'nuevoViaje' ? <Menu.Item paddingLeft={30} onSelect={() => setPageSelected('nuevoViaje')}>Nuevo Viaje</Menu.Item> : <></>}
            <Menu.Item icon={ArchiveIcon} onSelect={() => setPageSelected('pasajes')}>Pasajes</Menu.Item>
            <Menu.Item icon={PeopleIcon} onSelect={() => setPageSelected('usuarios')}>Usuarios</Menu.Item>
            <Menu.Item icon={BuggyIcon} disabled onSelect={() => toaster.notify('Hello world')}>Buses</Menu.Item>
          </Menu.Group>
          <Menu.Divider />
        </Pane>
        <Pane height='65%' display='flex' justifyContent='end' flexDirection='column'>
        <Menu.Group>
          <Menu.Item icon={SettingsIcon} disabled onSelect={() => toaster.notify('Hello world')}>Settings</Menu.Item>
        </Menu.Group>
        </Pane>
      </Pane>
      <Pane width='85%' height='90vh'>
        {handleContentCPanel(pageSelected)}
      </Pane>
    </Pane>
    </>
  );
}

export default CPanel
