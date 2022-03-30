import { Button, Pane, Text, TextInput, Card, Strong, toaster, Heading, IconButton, Position, Paragraph } from 'evergreen-ui'
import { UserIcon, LogInIcon } from 'evergreen-ui'
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'

export default function Navbar(){
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  function handleUserLogeado(){
    return(
      <Pane display='flex' padding={15} justifyContent='flex-end' >
        <Card backgroundColor="white" elevation={1} height={50} width={300} display="flex" alignItems="center" justifyContent="space-around">
          <Button appearance='primary' intent='success' height={36} onClick={() => router.push('/user')} iconAfter={UserIcon}>Mi Cuenta</Button>
          <Button appearance='primary' intent='danger' height={36} onClick={handleLogout} iconAfter={LogInIcon}>Desconectar</Button>
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

  const handleLogout = async (e) => {
      //e.preventDefault();
      const token = getCookie('token');
    try {
          const res = await fetch('api/userLogin', {
            headers: {
              'Authorization': 'Bearer ' + token
            },
            method: 'POST'
          })

          const result = await res.json();

          if(result.code === 500){
            toaster.error(result.message)
            //router.push('/login');
          }else if (result.code == 200) {
            toaster.success(result.message);
            removeCookies('token');
            router.push('/login');
          }
           //router.push("/login");
    } catch (error) {
      toaster.error(error.message);
    }
  };

  useEffect(() => {
    const token = getCookie('token');
    if(!token) {
      setIsLogged(false);
    }else {
      setIsLogged(true);
    }
  }, []);

  return(
    <>
      {isLogged ? (handleUserLogeado()) : (handleNoLogeado())}
    </>
  )
}
