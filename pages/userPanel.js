import {useState, useEffect} from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner } from 'evergreen-ui';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

function parseToken(token) {
  if(!token){return;}
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function Loading(){
  return(
    <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
      <Spinner />
    </Pane>
  )
}

function userPanel(){
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

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
      toast.error(error.message);
    }
  };
  const handleLoad = async (e) => {
      //e.preventDefault();
      const token = getCookie('token');
      if(!token) {router.push('/login')}
    try {
          const res = await fetch('api/userLogin', {
            headers: {
              'Authorization': 'Bearer ' + token
            },
            method: 'GET'
          })
          //Cargan los datos del usuario
          const result = await res.json()
          const userInfo = parseToken(result.data);
          setName(userInfo.name);
          setLastName(userInfo.lastName);
          setRut(userInfo.rut);
          setEmail(userInfo.email);
          setPhone(userInfo.phone);
          setPassword(userInfo.password);
          setRepassword(userInfo.password);
          //console.log(parseToken(result.data));

          if(result.code === 500){
            toaster.error(result.message)
            router.push('/login');
          }else if (result.code == 200) {
            toaster.success(result.message);
            //router.push('/login');
          }
           //router.push("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handlechangeName = async (e) => {
    setName(e.target.value)
    //console.log(e.target.id);
  };
  const handlechangeLastName = async (e) => {
    setLastName(e.target.value)
    //console.log(e.target.id);
  };
  const handlechangeRut = async (e) => {
    setRut(e.target.value)
    //console.log(e.target.id);
  };
  const handlechangeEmail = async (e) => {
    setEmail(e.target.value)
    //console.log(e.target.id);
  };
  const handlechangePhone = async (e) => {
    setPhone(e.target.value)
    //console.log(e.target.id);
  };
  const handlechangePassword = async (e) => {
    Password(e.target.value)
    //console.log(e.target.id);
  };
  const handlechangeRepassword = async (e) => {
    setRepassword(e.target.value)
    //console.log(e.target.id);
  };

  useEffect(() => {
    const token = getCookie('token');
    if(!token) {
      router.push('/login')
    }else {
      handleLoad();
    }
  }, []);

  return (
    //Login container
    <>
    {isLoading ? <Loading /> :(
      <Pane width='100%' height='100vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
        <form onSubmit={handleLogout}>
        {/*Login form*/}
          <Card elevation={1} height={500} width='100%' border="default" padding={30} display='flex' flexDirection='column' alignItems='center'>
            {/*Title*/}
                <Strong size={600} marginTop={10}>Profile</Strong>
                {/*Input Name*/}
                <TextInput name='name' placeholder='Name' type='text' onChange={handlechangeName} value={name} maxLength='15' marginTop={40} title='Ingrese solo létras' required pattern='[a-zA-Z]{1,15}' />
                {/*Input Last name*/}
                <TextInput name='lastName' placeholder='Last name' type='text' onChange={handlechangeLastName} value={lastName} maxLength='15' marginTop={10} pattern='[a-zA-Z]{1,15}' title='Ingrese solo létras' required />
                {/*Input RUT*/}
                <TextInput name='rut' placeholder='RUT' type='text' maxLength='10' onChange={handlechangeRut} value={rut} marginTop={10} pattern='[0-9]+[-|‐]{1}[0-9kK]{1}' title='Solo números y guión, k si es necesario.' required />
                {/*Input Email*/}
                <TextInput name='email' placeholder='Email' onChange={handlechangeEmail} value={email} marginTop={10} pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}' required title='Formato de email incorrecto' />
                {/*Input Phone*/}
                <TextInput name='phone' placeholder='Phone' onChange={handlechangePhone} value={phone} marginTop={10} required maxLength='10' title='Número de celular incorrecto' pattern='[0-9]{8,9}' />
                {/*Input Password*/}
                <TextInput name='password' placeholder='Password' type='password' onChange={handlechangePassword} value={password} minLength='8' maxLength='10' marginTop={10} required  />
                <TextInput name='repassword' placeholder='Repeat Password' onChange={handlechangeRepassword} value={repassword} type='password' minLength='8' maxLength='10' marginTop={10} required />
                {/*Login Button*/}
                <Button appearance='primary'  display='flex' marginTop={20} type='submit'>Edit</Button>
          </Card>
        </form>
        <Button appearance='primary' intent='danger' display='flex' marginTop={20} onClick={handleLogout}>Logout</Button>
        <Toaster />
      </Pane>
    )}
    </>
  );
}

export default userPanel
