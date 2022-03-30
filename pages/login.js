import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Button, Pane, Text, TextInput, Card, Strong, toaster, Spinner, IconButton } from 'evergreen-ui'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon } from 'evergreen-ui'
import LoadingComp from './components/loading'
import HomeButton from './components/homeButton';

function Login(){
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          const res = await fetch('api/userLogin', {
            body:JSON.stringify({
              email: event.target.email.value,
              password: event.target.password.value
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          })
          const result = await res.json();

          if(result.code === 500){
            toaster.danger(result.message)
          }else if (result.code == 200) {
            //Generamos cookie con el token de respuesta
            setCookies('token', result.data);
            console.log(result.data)
            toaster.success(result.message);
            //Re-dirigimos a panel de usuario
            router.push('/user');
          }
    } catch (error) {
      toaster.danger(error.message);
    } finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = getCookie('token');
    if(!token) {
      //router.push('/login')
      setIsLoading(false);
    }else {
      router.push('/user')
    }
  }, []);

  return (
    <>
    {isLoading ? <LoadingComp /> : (
      <>
      <Pane display='flex' flexDirection='row' justifyContent='space-between' width={'100%'}>
        <HomeButton />
      </Pane>
      <Pane width='100%' height='90vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
        {/*Login form*/}
        <form onSubmit={handleSubmit}>
        <Card elevation={1} height={300} width='100%' border="default" margin={10} padding={10} display='flex' flexDirection='column' alignItems='center'>
          {/*Title*/}
          <Strong size={600} marginTop={10}>Login</Strong>
          {/*Input Email*/}
          <TextInput name='email' placeholder='Email' marginTop={50} required/>
          {/*Input Password*/}
          <TextInput name='password' placeholder='Password' marginTop={10} type='password' required/>
          {/*Login Button*/}
          <Button appearance='primary' marginTop={35} type='submit'>Enter</Button>
        </Card>
        </form>
      </Pane>
      </>
    )}
    </>
  );
}

export default Login
