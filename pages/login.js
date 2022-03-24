import {useState, useEffect} from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Button, Pane, Text, TextInput, Card, Strong } from 'evergreen-ui';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

function Login(){
  const router = useRouter();

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
            toast.error(result.message)
          }else if (result.code == 200) {
            //Generamos cookie con el token de respuesta
            setCookies('token', result.data);
            console.log(result.data)
            toast.success(result.message);
            //Re-dirigimos a panel de usuario
            router.push('/userPanel');
          }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    //Login container
    <Pane width='100%' height='100vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
      {/*Login form*/}
      <form onSubmit={handleSubmit}>
      <Card elevation={1} height={300} width='100%' border="default" margin={10} padding={10} display='flex' flexDirection='column' alignItems='center'>
        {/*Title*/}
        <Strong size={600} marginTop={10}>Login</Strong>
        {/*Input Email*/}
        <TextInput name='email' placeholder='Email' marginTop={50} />
        {/*Input Password*/}
        <TextInput name='password' placeholder='Password' marginTop={10} />
        {/*Login Button*/}
        <Button appearance='primary' marginTop={35} type='submit'>Enter</Button>
      </Card>
      </form>
      <Toaster />
    </Pane>
  );
}

export default Login
