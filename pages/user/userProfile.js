import {useState, useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, SideSheet, Heading, Position, IconButton, CrossIcon, Paragraph  } from 'evergreen-ui';
import { UserIcon, LogOutIcon, HomeIcon, AirplaneIcon } from 'evergreen-ui'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'
import {isMobile} from 'react-device-detect'
import LoadingComp from '../components/loading'
import { userService } from '../../services'

function parseToken(token) {
  if(!token){return;}
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function User(){
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({name:'', lastName:'', rut:'', email:'', phone:'', password:'', repassword:''});
  const [isShown, setIsShown] = useState(false);

  function logout(){
    userService.logout();
  }
  const handleLoad = async (e) => {
      //e.preventDefault();
    try {
          //Cargan los datos del usuario
          const userInfo = JSON.parse();
          userProfile.name = userInfo.name;
          userProfile.lastName = userInfo.lastName;
          userProfile.rut = userInfo.rut;
          userProfile.email = userInfo.email;
          userProfile.phone = userInfo.phone;
          userProfile.password = userInfo.password;
          userProfile.repassword = userInfo.password;
          //console.log(parseToken(result.data));

          if(result.code === 500){
            toaster.error(result.message)
            //router.push('/login');
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
  const handlechange = async (e) => {
    setUserProfile({...userProfile, [e.target.name]: e.target.value})
  };
  function userPanel(){
    return(
      <SideSheet isShown={isShown} onCloseComplete={() => setIsShown(false)} height='100vh' position={Position.LEFT} containerProps={{display: 'flex', flex: '1', flexDirection: 'column'}}>
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Menu</Heading>
          </Pane>
        </Pane>
        {/*PERFIL*/}
        <Pane flex="1" background="tint1" padding={15} marginBottom={-10}>
          <Card backgroundColor="white" flex='column' elevation={1} height={180} display="flex" alignItems="center" justifyContent="space-around">
            <Pane display='flex' flex='3'>
              {/*Avatar*/}
              <Pane flex='1' alignItems='center' justifyContent='center' display='flex'>
                <UserIcon size={72} color='muted' />
              </Pane>
              {/*Datos de usuario*/}
              <Pane flex='1'>
                <Heading>Nombre</Heading><Text>{userProfile.name}</Text>
                <Heading>Apellido</Heading><Text>{userProfile.lastName}</Text>
                <Heading>RUT</Heading><Text>{userProfile.rut}</Text>
              </Pane>
              <Pane flex='1'>
                <Heading>Correo</Heading><Text>{userProfile.email}</Text>
                <Heading>Teléfono</Heading><Text>+56 {userProfile.phone}</Text>
              </Pane>
            </Pane>
          </Card>
        </Pane>
        {/*VIAJES // BUSCAR VIAJES */}
          <Pane display='flex' background="tint1" padding={15} marginBottom={-10} flex='row' justifyContent="space-between">
            <Card display='block' backgroundColor="white" elevation={1} height={200} width='48%'>
              <Pane margin={20}>
                <Heading>Mis Viajes</Heading>
                <Paragraph marginTop={20}>Aqui puede ver todos los pasajes ya comprados..</Paragraph>
                <Button appearance='primary' marginTop={30} marginLeft={120} onClick={() => router.push('/user/userTickets')}>Ir a Mis Pasajes</Button>
              </Pane>
            </Card>
            <Card display='block' backgroundColor="white" elevation={1} height={200} width='48%'>
              <Pane margin={20}>
                <Heading>Buscar Viaje</Heading>
                <Paragraph marginTop={20}>Mira todas las opciones y eliga la que más le acomode..</Paragraph>
                <Button appearance='primary' marginTop={30} marginLeft={120} onClick={() => router.push('/buyTicket')}>Bucar un Viaje</Button>
              </Pane>
            </Card>
          </Pane>
        {/*ofertas? news? */}
        <Pane background="tint1" padding={15} >
          <Card paddingTop={20} backgroundColor="white" elevation={1} height={200} display="block" >
            <Heading marginLeft={25}>Ofertas</Heading>
            <Pane display='flex' justifyContent='center' alignItems='center'>
              <Paragraph>No info</Paragraph>
            </Pane>
          </Card>
        </Pane>
        {/*logout // otros */}
        <Pane flex="1" background="tint1" padding={15} paddingTop={150} paddingLeft={400}>
          <Card backgroundColor="white" elevation={1} height={60} width={160} display="flex" alignItems="center" justifyContent="space-around">
            <Heading>Desconectar</Heading>
            <IconButton appearance='primary' intent='danger' height={48} icon={LogOutIcon} onClick={logout} />
          </Card>
        </Pane>
      </SideSheet>
    )
  }
  function menuButtons(){
    return(
      <Pane>
        <IconButton icon={HomeIcon} height={54} margin={10} onClick={() => router.push('/')} />
        <IconButton icon={UserIcon} height={54} margin={10} onClick={() => setIsShown(true)} />
        <IconButton icon={AirplaneIcon} height={54} margin={10} onClick={() => router.push('/buyTicket')} />
        <IconButton icon={LogOutIcon} appearance='primary' intent='danger' height={54} margin={10} onClick={logout} />
      </Pane>
    )
  }
  function formProfile(){
    return(
      <Pane>
        <form onSubmit={logout}>
        {/*Login form*/}
          <Card elevation={1} border="default" display='flex' flexDirection='column' alignItems='center' padding={20}>
            {/*Title*/}
                <Strong size={600} marginTop={20}>Profile</Strong>
                {/*Input Name*/}
                <TextInput name='name' placeholder='Name' type='text' onChange={handlechange} value={userProfile.name} maxLength='15' marginTop={40} title='Ingrese solo létras' required pattern='[a-zA-Z]{1,15}' />
                {/*Input Last name*/}
                <TextInput name='lastName' placeholder='Last name' type='text' onChange={handlechange} value={userProfile.lastName} maxLength='15' marginTop={10} pattern='[a-zA-Z]{1,15}' title='Ingrese solo létras' required />
                {/*Input RUT*/}
                <TextInput name='rut' placeholder='RUT' type='text' maxLength='10' onChange={handlechange} value={userProfile.rut} marginTop={10} pattern='[0-9]+[-|‐]{1}[0-9kK]{1}' title='Solo números y guión, k si es necesario.' required />
                {/*Input Email*/}
                <TextInput name='email' placeholder='Email' onChange={handlechange} value={userProfile.email} marginTop={10} pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}' required title='Formato de email incorrecto' />
                {/*Input Phone*/}
                <TextInput name='phone' placeholder='Phone' onChange={handlechange} value={userProfile.phone} marginTop={10} required maxLength='10' title='Número de celular incorrecto' pattern='[0-9]{8,9}' />
                {/*Input Password*/}
                <TextInput name='password' placeholder='Password' type='text' onChange={handlechange} value={userProfile.password} minLength='8' maxLength='10' marginTop={10} required  />
                <TextInput name='repassword' placeholder='Repeat Password' onChange={handlechange} value={userProfile.repassword} type='password' minLength='8' maxLength='10' marginTop={10} required />
                {/*Login Button*/}
                <Button appearance='primary'  display='flex' marginTop={20} disabled type='submit'>Edit</Button>
          </Card>
        </form>
      </Pane>
    )
  }

  function setUserData(data){
    const u = JSON.parse(data)
    console.log(u)
    userProfile.name = u.name
  }

  useEffect(() => {
    const usrtmp = localStorage.getItem('user');
    setUserData(usrtmp);
    //userService.getAll(usrtmp).then(x => setUsers(x));
    //console.log(users);
  }, []);

  return (
    <Pane>
    {isLoading ? <LoadingComp /> :(
      <Pane width='100%' height='100vh'  border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
        <Card marginRight={20} size='large'>
            {menuButtons()}
        </Card>
        {formProfile()}
      </Pane>
    )}
    {userPanel()}
    </Pane>
  );
}


export default User
