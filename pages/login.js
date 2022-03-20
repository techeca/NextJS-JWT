import { Button, Pane, Text, TextInput, Card, Strong } from 'evergreen-ui'

function Login(){
  return (
    //Login container
    <Pane width='100%' height='100vh' border='default' display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
      {/*Login form*/}
      <Card elevation={1} height={300} width='30%' border="default" margin={10} padding={10} display='flex' flexDirection='column' alignItems='center'>
        {/*Title*/}
        <Strong size={600} marginTop={10}>Login</Strong>
        {/*Input Email*/}
        <TextInput name='text-input-email' placeholder='Email' marginTop={50} />
        {/*Input Password*/}
        <TextInput name='text-input-password' placeholder='Password' marginTop={10} />
        {/*Login Button*/}
        <Button appearance='primary' marginTop={35}>Enter</Button>
      </Card>
    </Pane>
  );
}

export default Login
