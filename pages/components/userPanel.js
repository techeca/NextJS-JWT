import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph  } from 'evergreen-ui'
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon } from 'evergreen-ui'
import { userService } from '../../services'
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

export default function UserPanel(u){
  const router = useRouter();

  function logout(){
    userService.logout();
  }
  return(
    <SideSheet isShown={u.isShown} onCloseComplete={u.handleUserPanel} height='100vh' position={Position.LEFT} containerProps={{display: 'flex', flex: '1', flexDirection: 'column'}}>
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
        <Pane padding={16}>
          <Heading size={600}>Menu</Heading>
        </Pane>
      </Pane>
      {/*PERFIL*/}
      <Pane flex="1" background="tint1" padding={15} marginBottom={-10}>
        <Card backgroundColor="white" flex='column' elevation={1} height={180} display="flex" alignItems="center" justifyContent="space-around">
          <Pane display='flex' flex='3'>
            {/*Avatar*/}
            <Pane flex='1' alignItems='center' justifyContent='center' display='flex'>
              <UserIcon size={72} color='muted' />
            </Pane>
            {/*Datos de usuario*/}
            <Pane flex='1'>
              <Heading>Nombre</Heading><Text>{u.userData.name}</Text>
              <Heading>Apellido</Heading><Text>{u.userData.lastName}</Text>
              <Heading>RUT</Heading><Text>{u.userData.rut}</Text>
            </Pane>
            <Pane flex='1'>
              <Heading>Correo</Heading><Text>{u.userData.email}</Text>
              <Heading>Teléfono</Heading><Text>+56 {u.userData.phone}</Text>
            </Pane>
          </Pane>
        </Card>
      </Pane>
      {/*VIAJES // BUSCAR VIAJES */}
        <Pane display='flex' background="tint1" padding={15} marginBottom={-10} flex='row' justifyContent="space-between">
          <Card display='block' backgroundColor="white" elevation={1} height={200} width='48%'>
            <Pane margin={20}>
              <Heading>Mis Viajes</Heading>
              <Paragraph marginTop={20}>Aqui puede ver todos los pasajes ya comprados..</Paragraph>
              <Button appearance='primary' marginTop={30} marginLeft={120} onClick={() => router.push('/user/userTickets')}>Ir a Mis Pasajes</Button>
            </Pane>
          </Card>
          <Card display='block' backgroundColor="white" elevation={1} height={200} width='48%'>
            <Pane margin={20}>
              <Heading>Buscar Viaje</Heading>
              <Paragraph marginTop={20}>Mira todas las opciones y eliga la que más le acomode..</Paragraph>
              <Button appearance='primary' marginTop={30} marginLeft={120} onClick={() => router.push('/buyTicket')}>Bucar un Viaje</Button>
            </Pane>
          </Card>
        </Pane>
      {/*ofertas? news? */}
      <Pane background="tint1" padding={15} >
        <Card paddingTop={20} backgroundColor="white" elevation={1} height={200} display="block" >
          <Heading marginLeft={25}>Ofertas</Heading>
          <Pane display='flex' justifyContent='center' alignItems='center'>
            <Paragraph>No info</Paragraph>
          </Pane>
        </Card>
      </Pane>
      {/*logout // otros */}
      <Pane flex="1" background="tint1" padding={15} paddingTop={150} paddingLeft={400}>
        <Card backgroundColor="white" elevation={1} height={60} width={160} display="flex" alignItems="center" justifyContent="space-around">
          <Heading>Desconectar</Heading>
          <IconButton appearance='primary' intent='danger' height={48} icon={LogOutIcon} onClick={logout} />
        </Card>
      </Pane>
    </SideSheet>
  )
}
