import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph, TrashIcon, Pagination, Dialog, FormField } from 'evergreen-ui';
import { useState, useEffect } from 'react'
import LoadingComp from '../components/loading'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'

function parseToken(token) {
  if(!token){return;}
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function TicketsOrder(carrito){
  //c.info c.fecha c.nroAsiento
  //info = origen destino
  let contador = 0;
  const [total, setTotal] = useState(0);
  let contTotal = carrito.carrito.length;  //total de pasajes
  const [carritoTry, setCarritoTry] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  function generarId(c){
      contador = contador+1;
      return contador
  }
  function generarTotal(){
    var newtotal = parseInt(total);
    carrito.carrito.map((pasaje) => newtotal = newtotal + parseInt(pasaje.info.costoViaje));
    return newtotal
  }
  function aplicarIVA(total, iva){
    var get19 = total * iva;
    var totalIva = total + get19;
    return totalIva
  }

  const handleLoad = async (e) => {
    setCarritoTry(carrito.carrito);
    const token = getCookie('token');
    if(!token){
      setUserToken(parseToken(token));
    }
  }
  function removeElement(array, c){

    let indexP = carrito.carrito.indexOf(c);
    const newCarr = carritoTry.filter((pasaje) =>  pasaje.code !== c.code);
    setCarritoTry(newCarr);
    //const minusElemt = carrito.carrito.filter((pasaje) => pasaje === c)
    carrito.rmvElmt(newCarr);

  }
  function print(carrito){
    console.log('cantidad total: '+carritoTry.length)
  }
  function comprarPasajes(){
    
    //Cerramos ventana, limpamos carro y lo enviamos limpio a buyTickets
    setIsShown(false);
    const empetyCar = [];
    carrito.rmvElmt(empetyCar)
  }

  function NoPasajes(){
    return(
      <>
        <Card elevation={1} height={500} width='60vh' border="default" padding={30} display='flex' flexDirection='column' alignItems='center'>
          {/*Title*/}
              <Strong size={600} marginBottom={10}>Carrito de Pasajes</Strong>
              {/*Input hora*/}
              {/*<TextInput name='hora' placeholder='Hora' type='text' onChange={handlechangeHora} value={hora} maxLength='15' marginTop={10} pattern='[0-9]{1,4}' title='Solo números' />*/}
              {/*Login Button*/}
              <Text color="muted">No hay pasajes</Text>
        </Card>
      </>
    )
  }
  function ResumenCompraNoLog(){
    return(
      <>
        <Card elevation={0} margin={10} border="default" display='flex' flexDirection='column' justifyContent='flex-start'>
          {/*Title*/}
              {/*Input hora*/}
              {/*<TextInput name='hora' placeholder='Hora' type='text' onChange={handlechangeHora} value={hora} maxLength='15' marginTop={10} pattern='[0-9]{1,4}' title='Solo números' />*/}
              <FormField label='Datos Personales' margin={20}>
              <Pane display='flex' flexDirection='column' alignItems='center'>
              <TextInput margin={10} placeholder='Nombres'></TextInput>
              <TextInput margin={10} placeholder='Apellidos'></TextInput>
              <TextInput margin={10} placeholder='Email'></TextInput>
              <TextInput margin={10} placeholder='Telefono'></TextInput>
              <TextInput margin={10} placeholder='Dirección'></TextInput>
              <TextInput margin={10} placeholder='RUT'></TextInput>
              </Pane>
              </FormField>
        </Card>
      </>
    )
  }
  function ResumenCompra(){
    const info = parseToken(getCookie('token'));

    return(
      <>
        <Card elevation={0} margin={10} border="default" display='flex' flexDirection='column' justifyContent='flex-start'>
          {/*Title*/}
              {/*Input hora*/}
              {console.log(info)}
              {/*<TextInput name='hora' placeholder='Hora' type='text' onChange={handlechangeHora} value={hora} maxLength='15' marginTop={10} pattern='[0-9]{1,4}' title='Solo números' />*/}
              <FormField label='Datos Personales' margin={20}>
              <Pane display='flex' flexDirection='column' alignItems='center'>
              <Pane><Text margin={10}>Nombre:</Text><Text margin={10}>{info.name}</Text></Pane>
              <Pane><Text margin={10}>Apellidos:</Text><Text margin={10}>{info.lastName}</Text></Pane>
              <Pane><Text margin={10}>Email:</Text><Text margin={10}>{info.email}</Text></Pane>
              <Pane><Text margin={10}>Telefono:</Text><Text margin={10}>{info.phone}</Text></Pane>
              <Pane><Text margin={10}>Dirección:</Text><Text margin={10}>{info.name}</Text></Pane>
              <Pane><Text margin={10}>RUT:</Text><Text margin={10}>{info.rut}</Text></Pane>
              </Pane>
              </FormField>
        </Card>
      </>
    )
  }
  function BuyPanel(){
    const totalPasaje = carritoTry.length;

    return(
      <Pane>
      <Dialog isShown={isShown} title="Resumen" onCloseComplete={() => setIsShown(false)} preventBodyScrolling onConfirm={() => comprarPasajes()} confirmLabel="Comprar">
        <Pane display='flex' flexDirection='column'>
        {/*Verificar si hay cockies, dependiendo si ahy o no cambia el componente*/}
          {userToken === '' ? <ResumenCompra /> : <ResumenCompraNoLog />}
          <Text></Text>

          <Card elevation={0} margin={10} border="default" display='flex' flexDirection='column' alignItems='flex-end'>
          <FormField label='Costo Total' margin={20}>
          <Pane display='flex' flexDirection='column' alignItems='flex-end'>
          <Text>${generarTotal()}</Text>
          </Pane>
          </FormField>
          </Card>
        </Pane>
      </Dialog>
    </Pane>
    )
  }

  useEffect(() => {
    const qunt = carrito.carrito.length;
    if(qunt > 0){
      handleLoad();
      setIsLoading(false);
    }
  }, []);

    return(
      <>
      {isLoading ? <NoPasajes /> : (
        <Card elevation={1} height={500} width='60vh' border="default" padding={30} display='flex' flexDirection='column' alignItems='center'>
          {/*Title*/}

              <Strong size={600} marginBottom={10}>Carrito de Pasajes</Strong>
              {/*Input hora*/}
              {/*<TextInput name='hora' placeholder='Hora' type='text' onChange={handlechangeHora} value={hora} maxLength='15' marginTop={10} pattern='[0-9]{1,4}' title='Solo números' />*/}
              {/*Login Button*/}
              {/*<Text color="muted">No hay pasajes</Text>*/}

              {carrito.carrito.map((c) =>

              <Pane key={generarId(c)} border='default' background="tint2" padding={10} marginTop={10} width='100%' display='flex' justifyContent='space-around'>

                <Pane display='flex' flexDirection='column'>
                  <Strong color="muted">Nº Asiento</Strong>
                  <Text textAlign='center' color="muted">{c.nroAsiento}</Text>
                </Pane>

                <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                  <Strong color="muted">Trayectoria</Strong>
                  <Pane display='flex' flexDirection='row' justifyContent='space-around'>
                    <Text textAlign='center' color="muted">{c.info.origen}</Text>
                    <Text textAlign='center' color="muted">-</Text>
                    <Text textAlign='center' color="muted">{c.info.destino}</Text>
                  </Pane>
                </Pane>

                <Pane display='flex' flexDirection='column'>
                  <Strong color="muted">Hora</Strong>
                  <Text textAlign='center' color="muted">{c.info.horaSalida}</Text>
                </Pane>

                <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                  <Strong color="muted">Fecha</Strong>
                  <Text textAlign='center' color="muted">{c.fecha}</Text>
                </Pane>

                <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                  <IconButton icon={TrashIcon} onClick={() => removeElement(carritoTry, c)} intent='danger' />
                </Pane>

              </Pane>
              )}
              <Pane display='flex' flexDirection='column' justifyContent='space-between' width='90%' height={'100%'} justifyContent='flex-end' >

                  <Pane display='flex' flexDirection='row' justifyContent='space-between'>
                    <Pane>
                      <Strong>Total:</Strong><Text> ${generarTotal()}</Text>
                    </Pane>
                  <Button appearance='primary' onClick={() => setIsShown(true)} type='submit'>Ir a pagar</Button>
                  </Pane>

              </Pane>

        </Card>
      )}
      {BuyPanel()}
      </>

    )
}

export default TicketsOrder;
