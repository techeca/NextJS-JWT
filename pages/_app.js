import '../styles/globals.css'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { userService } from '../services'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const authCheck = useCallback((url) => {
    //Paths permitidos para usuario no logeados //pages
     const publicPaths = ['/', '/login', '/register', '/travels/buyTicket'];
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
  }, [router])

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, [router, authCheck]);

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
