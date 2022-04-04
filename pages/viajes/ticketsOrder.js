import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph, TrashIcon, Pagination } from 'evergreen-ui';
import { useState, useEffect } from 'react'
import LoadingComp from '../components/loading'

function TicketsOrder(carrito){
  //c.info c.fecha c.nroAsiento
  //info = origen destino
  let contador = 0;
  const [total, setTotal] = useState('');
  let contTotal = carrito.carrito.length;  //total de pasajes
  const [carritoTry, setCarritoTry] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function generarId(){
      contador = contador+1
      return contador
  }

  const handleLoad = async (e) => {
    setCarritoTry(carrito.carrito);
  }

  function removeElement(array, c){

    let indexP = carrito.carrito.indexOf(c);
    const newCarr = carritoTry.filter((pasaje) =>  pasaje.code !== c.code);
    setCarritoTry(newCarr);
    //const minusElemt = carrito.carrito.filter((pasaje) => pasaje === c)
    carrito.rmvElmt(newCarr);
    console.log('index a remover: '+indexP);
  }

  function print(carrito){
    console.log('cantidad total: '+carritoTry.length)
  }

  function useForceUpdate(){
      const [value, setValue] = useState(0); // integer state
      return () => setValue(value => value + 1); // update the state to force render
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

              <Pane key={generarId()} border='default' background="tint2" padding={10} marginTop={10} width='100%' display='flex' justifyContent='space-around'>

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
                    <Strong>Total:</Strong><Text> $100.000</Text>
                    </Pane>

                  <Button appearance='primary' onClick={() => print(carritoTry)} type='submit'>Ir a pagar</Button>
                  </Pane>

              </Pane>

        </Card>
      )}
      </>
    )
}

export default TicketsOrder;
