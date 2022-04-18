import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Button, Pane, Text, TextInput, Card, Strong, toaster, LogInIcon } from 'evergreen-ui'
import {userService} from '../services'
import HomeButton from './components/homeButton'
import LoadingComp from './components/loading'

function Register(){
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
      return userService.register(event.target.name.value, event.target.lastName.value, event.target.rut.value, event.target.email.value, event.target.phone.value, event.target.password.value)
        .then(() => {
            const returnUrl = router.query.returnUrl || '/';
            router.push(returnUrl);
        })
        .catch(error => {
          toaster.danger(error+' ');
        });
  };

  useEffect(() => {
    if(userService.userValue){
      router.push('/')
    }else{
      setIsLoading(false)
    }
  }, [])

  return (
    <>
    {isLoading ? <LoadingComp /> : (
      <>
      <Pane display='flex' flexDirection='row' justifyContent='space-between' width={'100%'}>
        <HomeButton />
        <Pane display='flex' padding={15} justifyContent='flex-end' >
          <Card backgroundColor="white" elevation={0} height={50} width={160} display="flex" alignItems="center" justifyContent="space-around">
            <Button appearance='primary' intent='success' height={36} onClick={() => router.push('/login')} iconAfter={LogInIcon}>Log In</Button>
          </Card>
        </Pane>
      </Pane>
      <Pane width='100%' height='90vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
        <form onSubmit={handleSubmit}>
        {/*Login form*/}
          <Card elevation={1} height={500} width='100%' border="default" padding={30} display='flex' flexDirection='column' alignItems='center'>
            {/*Title*/}
                <Strong size={600} marginTop={10}>Registro</Strong>
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
                <Button appearance='primary' display='flex' marginTop={30} type='submit'>Enviar</Button>
          </Card>
        </form>
      </Pane>
      </>
    )}
    </>
  );
}

export default Register
