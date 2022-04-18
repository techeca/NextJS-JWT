import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { userService } from '../services'
import { Nav } from './components/navbar'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url) {
    //Paths permitidos //pages
     const publicPaths = ['/', '/login', '/register', '/buyTicket'];
     const path = url.split('?')[0];
     if(!userService.userValue && !publicPaths.includes(path)){
       setAuthorized(false);
       router.push({
         pathname: '/login',
         query: { returnUrl: router.asPath}
       });
     }else {
       setAuthorized(true);
     }
  }

  return (
    <>
    {authorized &&
      <>
        <Component {...pageProps} />
      </>
    }

    </>
  )
}

export default MyApp
