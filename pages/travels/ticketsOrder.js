import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph, TrashIcon, Pagination, Dialog, FormField } from 'evergreen-ui';
import { useState, useEffect, useCallback } from 'react'
import LoadingComp from '../components/loading'
import { userService, ticketsService } from '@services/index'

function TicketsOrder(carr){
  let contador = 0
  const [total, setTotal] = useState(0)
  const [carritoTry, setCarritoTry] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  const handleLoad = useCallback((e) => {
    try {
        //Revisamos si esta logeado e insermos carrito con pasajes
            if(userService.userValue){
              setCarritoTry(carr.carrito)
              setIsLogged(true)
            }else {
              setCarritoTry(carr.carrito)
              setIsLogged(false)
            }
          }
    catch (error) {
      toaster.danger(error);
    } finally {
      setIsLoading(false);
    }
  }, [carr.carrito])
  //Funcion para eliminar pasajes del carrito
  function removeElement(array, c){
    let indexP = carr.carrito.indexOf(c);
    const newCarr = carritoTry.filter((pasaje) =>  pasaje.code !== c.code);
    setCarritoTry(newCarr);
    //const minusElemt = carrito.carrito.filter((pasaje) => pasaje === c)
    carr.rmvElmt(newCarr);
  }
  //helpers
  function generarId(c){
      contador = contador+1;
      return contador
  }
  function generarTotal(){
    var newtotal = parseInt(total);
    carr.carrito.map((pasaje) => newtotal = newtotal + parseInt(pasaje.info.costoViaje));
    return newtotal
  }
  function aplicarIVA(total, iva){
    var get19 = total * iva;
    var totalIva = total + get19;
    return totalIva
  }
  //Funcion para ingresar nuevos pasajes, ingresa los datos dependiendo del tipo de usuario
  const comprarPasajes = async (e) => {
    const carrito = carritoTry
    const userData = ''
      if(userService.userValue){
        userData = userService.userValue
        return ticketsService.buyTickets(userData, carrito)
          .then(() => {
            //Si va todo bien, cerramos cuadro de compra y limpiamos carrito
            setIsShown(false)
            const emptyCar = []
            carr.rmvElmt(emptyCar)
            toaster.success('Pasaje/s comprados')
          })
          .catch(e => {
            console.log(e)
          })
      }else {
        userData = {name:'', lastName:'', rut:'', phone:'', email:''}
        ticketsService.buyTickets(userData, carrito)
      }
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
  //Form para que usuario no registrado ingrese sus datos
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
  //Data de usuario registrado
  function ResumenCompra(){
    //const info = parseToken(getCookie('token'));
    const u = JSON.parse(localStorage.getItem('user'))
    return(
      <>
        <Card elevation={0} margin={10} border="default" display='flex' flexDirection='column' justifyContent='flex-start'>
          {/*Title*/}
              {/*Input hora*/}
              {/*<TextInput name='hora' placeholder='Hora' type='text' onChange={handlechangeHora} value={hora} maxLength='15' marginTop={10} pattern='[0-9]{1,4}' title='Solo números' />*/}
              <FormField label='Datos Personales' margin={20}>
              <Pane display='flex' flexDirection='column' alignItems='center'>
              <Pane><Text margin={10}>Nombre:</Text><Text margin={10}>{u.name}</Text></Pane>
              <Pane><Text margin={10}>Apellidos:</Text><Text margin={10}>{u.lastName}</Text></Pane>
              <Pane><Text margin={10}>Email:</Text><Text margin={10}>{u.email}</Text></Pane>
              <Pane><Text margin={10}>Telefono:</Text><Text margin={10}>{u.phone}</Text></Pane>
              <Pane><Text margin={10}>Dirección:</Text><Text margin={10}>{u.name}</Text></Pane>
              <Pane><Text margin={10}>RUT:</Text><Text margin={10}>{u.rut}</Text></Pane>
              </Pane>
              </FormField>
        </Card>
      </>
    )
  }
  //Contenedor para resumen de compra, datos de usuario + costo pasajes
  function BuyPanel(){
    return(
      <Pane>
      <Dialog isShown={isShown} title="Resumen" onCloseComplete={() => setIsShown(false)} preventBodyScrolling onConfirm={() => comprarPasajes()} confirmLabel="Comprar">
        <Pane display='flex' flexDirection='column'>
        {/*Verificar si hay cockies, dependiendo si ahy o no cambia el componente*/}
          {isLogged ? <ResumenCompra /> : <ResumenCompraNoLog />}
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
    handleLoad()
  }, [handleLoad]);

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

              {carritoTry.map((c) =>

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
              <Pane display='flex' flexDirection='column' width='90%' height={'100%'} justifyContent='flex-end' >

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
