import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Button, Pane, Text, TextInput, Card, Strong, toaster, Spinner, IconButton } from 'evergreen-ui'
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon, LogInIcon, NewPersonIcon } from 'evergreen-ui'
import LoadingComp from './components/loading'
import HomeButton from './components/homeButton'
import {userService} from '../services'

function Login(){
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
      return userService.login(event.target.email.value, event.target.password.value)
        .then(() => {
            const returnUrl = router.query.returnUrl || '/';
            router.push(returnUrl)
        })
        .catch(error => {
          toaster.danger(error);
        })
  }

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
            <Button appearance='primary' intent='success' height={36} onClick={() => router.push('/register')} iconAfter={NewPersonIcon}>Registro</Button>
          </Card>
        </Pane>
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
  )
}

export default Login
