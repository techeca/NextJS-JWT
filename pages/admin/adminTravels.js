import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, Checkbox, FormField, toaster } from 'evergreen-ui'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'


function Travels(){
  const router = useRouter();
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
            const res = await fetch('api/admin', {
              body:JSON.stringify({
                info: datosViaje,
                semana: semana
              }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            })
            const result = await res.json()

            if(result.code === 500){
              toaster.danger(result.message)
            }else if (result.code == 200) {
              toaster.success(result.message);
              //router.push('/login');
            }
          }
        }else {
          toaster.danger('El límite de pasaeros debe ser 40 o menos');
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

  useEffect(() => {
    const token = getCookie('token');
    if(!token) {router.push('/login')}
  }, []);

  return (
    //Login container
    <Pane width='100%' height='100vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
      <form onSubmit={handleSubmit}>
      {/*Login form*/}
        <Card elevation={1} height='100%' width='100%' border="default" padding={30} display='flex' flexDirection='column' alignItems='center'>
          {/*Title*/}
              <Strong size={600} marginTop={10}>Nuevo Viaje</Strong>
              {/*Input oriden de viaje*/}
              <TextInput name='origen' placeholder='Origen' type='text' maxLength='15' onChange={handleDatos} marginTop={40} title='Solo létras' required pattern='[a-zA-Z\s]{1,15}' />
              {/*Input destino de viaje*/}
              <TextInput name='destino' placeholder='Destino' type='text' maxLength='15' onChange={handleDatos} marginTop={10} pattern='[a-zA-Z\s]{1,15}' title='Solo létras' required />
              {/*Input Costo viaje*/}
              <TextInput name='costoViaje' placeholder='Costo pasaje' type='text' marginTop={10} pattern='[0-9]{1,4}' onChange={handleDatos} title='Solo números' required/>
              {/*Input limite de pasajeros en viaje*/}
              <TextInput name='limitePasajeros' placeholder='Limite pasajeros' type='text' marginTop={10} pattern='[0-9]{1,2}' onChange={handleDatos} required title='Solo números' />
              {/*Input hora de salida de maquina*/}
              <TextInput name='horaSalida' placeholder='Hora salida' type='text' marginTop={10} pattern='[0-9]{1,4}' onChange={handleDatos} required title='Solo números' />
              {/*Check box dias*/}
              <FormField label='Seleccione un día:' marginTop={20}>
                <Pane display='flex'>
                <Checkbox name='lunes' label='Lunes' checked={semana.lunes} onChange={handleCB} marginRight={5} />
                <Checkbox name='martes' label='Martes' checked={semana.martes} onChange={handleCB} marginRight={5}/>
                <Checkbox name='miercoles' label='Miercoles' checked={semana.miercoles} onChange={handleCB} marginRight={5}/>
                <Checkbox name='jueves' label='Jueves' checked={semana.jueves} onChange={handleCB} marginRight={5}/>
                <Checkbox name='viernes' label='Viernes' checked={semana.viernes} onChange={handleCB} />
                < /Pane>
                <Pane display='flex'>
                <Checkbox name='sabado' label='Sabado' checked={semana.sabado} onChange={handleCB} marginRight={5} />
                <Checkbox name='domingo' label='Domingo' checked={semana.domingo} onChange={handleCB} />
                < /Pane>
              < /FormField>
              {/*Button de formulario*/}
              <Button appearance='primary' display='flex' marginTop={10} type='submit'>Crear</Button>
        </Card>
      </form>
    </Pane>
  );
}

export default Travels
