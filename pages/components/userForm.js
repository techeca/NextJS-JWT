import { Button, Pane, TextInput, Card, Strong, Heading } from 'evergreen-ui'
import { userService } from '../../services'

export default function UserForm(u, handlechange){

  //camibiar por edit //PUT
  function logout(){
    userService.logout();
  }

  return(
    <Pane>
      <form onSubmit={logout}>
      {/*Login form*/}
        <Card elevation={1} border="default" display='flex' flexDirection='column' alignItems='center' padding={20}>
          {/*Title*/}
              <Strong size={600} marginTop={20}>Profile</Strong>
              {/*Input Name*/}
              <TextInput name='name' placeholder='Name' type='text' onChange={u.handlechange} value={u.userData.name} maxLength='15' marginTop={40} title='Ingrese solo létras' required pattern='[a-zA-Z]{1,15}' />
              {/*Input Last name*/}
              <TextInput name='lastName' placeholder='Last name' type='text' onChange={u.handlechange} value={u.userData.lastName} maxLength='15' marginTop={10} pattern='[a-zA-Z]{1,15}' title='Ingrese solo létras' required />
              {/*Input RUT*/}
              <TextInput name='rut' placeholder='RUT' type='text' maxLength='10' onChange={u.handlechange} value={u.userData.rut} marginTop={10} pattern='[0-9]+[-|‐]{1}[0-9kK]{1}' title='Solo números y guión, k si es necesario.' required />
              {/*Input Email*/}
              <TextInput name='email' placeholder='Email' onChange={u.handlechange} value={u.userData.email} marginTop={10} pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}' required title='Formato de email incorrecto' />
              {/*Input Phone*/}
              <TextInput name='phone' placeholder='Phone' onChange={u.handlechange} value={u.userData.phone} marginTop={10} required maxLength='10' title='Número de celular incorrecto' pattern='[0-9]{8,9}' />
              {/*Input Password*/}
              <TextInput name='password' placeholder='Password' type='text' onChange={u.handlechange} value={u.userData.password} minLength='8' maxLength='10' marginTop={10} required  />
              <TextInput name='repassword' placeholder='Repeat Password' onChange={u.handlechange} value={u.userData.repassword} type='password' minLength='8' maxLength='10' marginTop={10} required />
              {/*Login Button*/}
              <Button appearance='primary'  display='flex' marginTop={20} disabled type='submit'>Edit</Button>
        </Card>
      </form>
    </Pane>
  )
}
