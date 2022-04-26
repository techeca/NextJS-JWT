import { Button, Pane, Text, TextInput, Card, Strong, toaster, Heading, IconButton, Position, Paragraph } from 'evergreen-ui'
import { UserIcon, LogInIcon } from 'evergreen-ui'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { adminService } from '../../services'

export default function Navbar(){
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  function handleUserLogeado(){
    return(
      <Pane display='flex' padding={10} justifyContent='flex-end' >
        <Card backgroundColor="white" elevation={1} height={50} width={300} display="flex" alignItems="center" justifyContent="space-around">
          <Button appearance='primary' intent='success' height={36} onClick={() => router.push('/admin')} iconAfter={UserIcon}>CPanel</Button>
          <Button appearance='primary' intent='danger' height={36} onClick={logout} iconAfter={LogInIcon}>Desconectar</Button>
        </Card>
      </Pane>
    )
  }
  function handleNoLogeado(){
    return(
      <Pane display='flex' padding={10} justifyContent='flex-end' >
        <Card backgroundColor="white" elevation={0} height={50} width={160} display="flex" alignItems="center" justifyContent="space-around">
          <Button appearance='primary' intent='success' height={36} onClick={() => router.push('/admin/login')} iconAfter={LogInIcon}>Conectar</Button>
        </Card>
      </Pane>
    )
  }
  function logout(){
    adminService.logoutadm();
  }

  useEffect(() => {
    const subscription = adminService.admin.subscribe(x => setAdmin(x));
    return () => subscription.unsubscribe();
  }, []);

  return(
    <>
      {admin ? (handleUserLogeado()) : (handleNoLogeado())}
    </>
  )
}
