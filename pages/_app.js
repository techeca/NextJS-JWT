import '../styles/globals.css'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { userService, adminService } from '../services'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const authCheck = useCallback((url) => {
    //Paths permitidos para usuario no logeados //pages
     const publicPaths = ['/', '/login', '/register', '/travels/buyTicket', '/admin/login'];
     const admPaths = ['/admin/newTravel'];
     const path = url.split('?')[0];
     if(!userService.userValue && !publicPaths.includes(path)){   //si no está logeado y no está en ruta publica
           if(adminService.adminValue && admPaths.includes(path)){   //está logeado como admin y esta en ruta de admin
             setAuthorized(true);
           }else {
             setAuthorized(false);
             router.push({
               pathname: '/',
               query: { returnUrl: router.asPath}
             });
           }
     }else if(!adminService.adminValue && admPaths.includes(path)){
       setAuthorized(false);
       router.push({
         pathname: '/',
         query: { returnUrl: router.asPath}
       });
     } else {
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
