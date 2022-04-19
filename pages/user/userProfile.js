import {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph  } from 'evergreen-ui'
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon } from 'evergreen-ui'
import {isMobile} from 'react-device-detect'
import LoadingComp from '../components/loading'
import UserForm from '../components/userForm'
import UserPanel from '../components/userPanel'
import { userService } from '@services/index'

function User(){
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState({name:'', lastName:'', rut:'', email:'', phone:'', password:'', repassword:''})
  const [isShown, setIsShown] = useState(false)

  //Funcion para desconectar, elimina los datos del servicio de usuario
  function logout(){
    userService.logout();
  }
  //Controla el panel de usuario
  const handleUserPanel = async (e) => {
    setIsShown(!isShown)
  }
  //Controla formulario de datos de usuario
  const handlechange = async (e) => {
    setUserProfile({...userProfile, [e.target.name]: e.target.value})
  }
  //SACAR
  function menuButtons(){
    return(
      <Pane>
        <IconButton icon={HomeIcon} height={54} margin={10} onClick={() => router.push('/')} />
        <IconButton icon={UserIcon} height={54} margin={10} onClick={() => handleUserPanel()} />
        <IconButton icon={AirplaneIcon} height={54} margin={10} onClick={() => router.push('/travels/buyTicket')} />
        <IconButton icon={LogOutIcon} appearance='primary' intent='danger' height={54} margin={10} onClick={logout} />
      </Pane>
    )
  }

  async function setUserData(data){
    const u = JSON.parse(data)
    //Inserta los datos del usuario en el useState UserProfile (para formulario)
    userProfile.name = u.name
    userProfile.lastName = u.lastName
    userProfile.rut = u.rut
    userProfile.email = u.email
    userProfile.phone = u.phone
  }

  useEffect(() => {
    //Obtiene los datos guardados al iniciar cuenta
    const usrtmp = localStorage.getItem('user')
    setUserData(usrtmp).then(setLoading(false))
    //userService.getAll(usrtmp).then(x => setUsers(x));
  }, [])

  return (
    <Pane>
    {isLoading ? <LoadingComp /> :(
      <Pane width='100%' height='100vh'  border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
        <Card marginRight={20} size='large'>
            {menuButtons()}
        </Card>
        <UserForm userData={userProfile} handlechange={handlechange} />
      </Pane>
    )}
    <UserPanel handleUserPanel={handleUserPanel} isShown={isShown} userData={userProfile} />
    </Pane>
  )
}

export default User
