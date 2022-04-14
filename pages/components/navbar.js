import { Button, Pane, Text, TextInput, Card, Strong, toaster, Heading, IconButton, Position, Paragraph } from 'evergreen-ui'
import { UserIcon, LogInIcon } from 'evergreen-ui'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { userService } from '../../services'

export default function Navbar(){
  const router = useRouter();
  const [user, setUser] = useState(null);
  function handleUserLogeado(){
    return(
      <Pane display='flex' padding={15} justifyContent='flex-end' >
        <Card backgroundColor="white" elevation={1} height={50} width={300} display="flex" alignItems="center" justifyContent="space-around">
          <Button appearance='primary' intent='success' height={36} onClick={() => router.push('/user/userProfile')} iconAfter={UserIcon}>Mi Cuenta</Button>
          <Button appearance='primary' intent='danger' height={36} onClick={logout} iconAfter={LogInIcon}>Desconectar</Button>
        </Card>
      </Pane>
    )
  }
  function handleNoLogeado(){
    return(
      <Pane display='flex' padding={15} justifyContent='flex-end' >
        <Card backgroundColor="white" elevation={0} height={50} width={160} display="flex" alignItems="center" justifyContent="space-around">
          <Button appearance='primary' intent='success' height={36} onClick={() => router.push('/login')} iconAfter={LogInIcon}>Conectar</Button>
        </Card>
      </Pane>
    )
  }
  function logout(){
    userService.logout();
  }

  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return(
    <>
      {user ? (handleUserLogeado()) : (handleNoLogeado())}
    </>
  )
}
