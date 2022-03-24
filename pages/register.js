import {useState, useEffect} from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField } from 'evergreen-ui';

function Register(){
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(event.target.password.value !== event.target.repassword.value){
          throw 'Contraseñas diferentes'
        }else {
          const res = await fetch('api/userRegister', {
            body:JSON.stringify({
              name: event.target.name.value,
              lastName: event.target.lastName.value,
              rut: event.target.rut.value,
              phone: event.target.phone.value,
              email: event.target.email.value,
              password: event.target.password.value
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          })
          const result = await res.json()

          if(result.code === 500){
            toast.error(result.message)
          }else if (result.code == 200) {
            toast.success(result.message);
            router.push('/login');
          }
          //router.push("/login");

        }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    //Login container
    <Pane width='100%' height='100vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
      <form onSubmit={handleSubmit}>
      {/*Login form*/}
        <Card elevation={1} height={500} width='100%' border="default" padding={30} display='flex' flexDirection='column' alignItems='center'>
          {/*Title*/}
              <Strong size={600} marginTop={10}>Register</Strong>
              {/*Input Name*/}
              <TextInput name='name' placeholder='Name' type='text' maxLength='15' marginTop={40} title='Ingrese solo létras' required pattern='[a-zA-Z]{1,15}' />
              {/*Input Last name*/}
              <TextInput name='lastName' placeholder='Last name' type='text' maxLength='15' marginTop={10} pattern='[a-zA-Z]{1,15}' title='Ingrese solo létras' required />
              {/*Input RUT*/}
              <TextInput name='rut' placeholder='RUT' type='text' maxLength='10' marginTop={10} pattern='[0-9]+[-|‐]{1}[0-9kK]{1}' title='Solo números y guión, k si es necesario.' required/>
              {/*Input Email*/}
              <TextInput name='email' placeholder='Email' marginTop={10} pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}' required title='Formato de email incorrecto' />
              {/*Input Phone*/}
              <TextInput name='phone' placeholder='Phone' marginTop={10} required maxLength='10' title='Número de celular incorrecto' pattern='[0-9]{8,9}' />
              {/*Input Password*/}
              <TextInput name='password' placeholder='Password' type='password' minLength='8' maxLength='10' marginTop={10} required  />
              <TextInput name='repassword' placeholder='Repeat Password' type='password' minLength='8' maxLength='10' marginTop={10} required />
              {/*Login Button*/}
              <Button appearance='primary' display='flex' marginTop={20} type='submit'>Send</Button>
        </Card>
      </form>
      <Toaster />
    </Pane>
  );
}

export default Register
