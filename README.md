## Busystem

Proyecto simple en el que se puede:

Como USUARIO puedes:\
-Comprar Pasajes\
-Ver tus Pasajes comprados

Como ADMINISTRADOR puedes:\
-Ver todos los Pasajes\
-Ver, Bloquear a Usuarios\
-Ver, Crear, Modificar y Eliminar los Viajes\
-Ver, Crear, Modificar y Eliminar los Buses

Verificación con JWT
En resumen, todas los request realizadas pasan por `helpers/api` el cual se encarga de encapsular las solicitudes y verificarlas con `express-jwt`.

## Getting Started

Instalar dependencias

```bash
npm i
```

Para pruebas locales

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Páginas

`/` - Home. \
`/user` - Panel con información de usuario logeado.\
`/user/userTickets` - Pasajes comprados por usuario.\
`/buyTicket` Formulario para buscar viajes y ver sus detalles.\
`/login` - Formulario para iniciar sesion.\
`/register` - Registro de nuevo usuario.\
`/admin` - Panel de Admin.\
`/admin/login` - Formulario para iniciar sesion como Admin.

## Base de Datos MySQL

Base de Datos para pruebas alojada en (https://remotemysql.com)

```bash
DB_HOST=remotemysql.com
DB_USER=AwSgxyBf1n
DB_PASS=lcob4VuM8u
DB_NAME=AwSgxyBf1n
API_KEY=4626c7660cb17cca76b21bc5a52f8de133be0f7d44cc2596f6601812d1010edacf920d0e2a90b75222e4f8e6db9b1710c885d97312f229f97189de2720fce442
```

Cuenta para pruebas

```bash
usuario: admin
contraseña: qweqweqwe
```

## CONFIG

En `next.config.js` están las variables para la configuración en general, no es necesario tocar nada para relizar pruebas.

Para API
```bash
secret: 'SECRET_:O'
```

Para conexion de API DEV/PROD
```bash
apiUrl: process.env.NODE_ENV === 'development'
 ? 'http://localhost:3000/api' // dev
 : 'https://production/api'    // prod
```

Ubicación remota para imagenes, no necesario.
```bash
loader:'imgix',
path: 'https://jmorrison.imgix.net'
```

En `_app.js` están las rutas de páginas públicas y protegidas\
En `helpers/api/jwt-middleware` están las rutas de API públicas

## TODO

Agregar Adaptación para celulares\
Faltan funciones en panel de ADMIN\
Cambiar a mysql2

## More

- [Next.js](https://nextjs.org/docs)
- [Evergreen](https://evergreen.segment.com)
- [Datepicker](https://reactdatepicker.com)
- [react-device-detect](https://github.com/duskload/react-device-detect)
- [Express-JWT](https://github.com/auth0/express-jwt)
