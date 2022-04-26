import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Pane, Text, TextInput, Card, Strong, toaster, Heading, IconButton, Position, Paragraph } from 'evergreen-ui'
import Navbar from './components/navbar'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  return (
    <Pane height={'100vh'}>
      <Head>
        <title>Busystem</title>
        <meta name="description" content="Sistema para venta de pasajes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {/*Login*/}
        <Navbar />
        {/*Main content*/}
        <Card display='flex' flexDirection='column' margin={20} height={'80%'} alignItems='center' justifyContent='center'>
          <Pane border='default'>
            <Heading margin={10} size={900}>Bienvenido a Busystem</Heading>
          </Pane>
          <Pane marginTop={20}>
            <Paragraph size={500}>Sistema de Venta y administración de Viajes y Pasajes.</Paragraph>
          </Pane>
          <Button marginTop={20} onClick={() => router.push('/travels/buyTicket')} appearance='primary'>Comprar pasaje</Button>
          <Button marginTop={20} onClick={() => router.push('/admin/login')} appearance='primary'>CPanel</Button>
        </Card>
          {/*Footer*/}
          <Pane borderTop height={30} alignItems='center' justifyContent='space-around' display='flex' flexDirection='row'>
            <Text>footer</Text>
          </Pane>
    </Pane>
  )
}
