## Busystem

Proyecto simple en el que se puede:

Como USUARIO puedes:\
-Comprar Pasajes\
-Ver tus Pasajes comprados

Como ADMINISTRADOR puedes:\
-Ver todos los Pasajes\
-Ver y Bloquear a Usuarios\
-Ver, Crear, Modificar y Eliminar los Viajes\
-Ver, Crear, Modificar y Eliminar los Buses

Verificación con JWT\
En resumen, todas los request realizadas pasan por `helpers/api` el cual se encarga de encapsular las solicitudes y verificarlas con `express-jwt`.

## Getting Started

Instalar dependencias.

```bash
npm i
```

Para pruebas locales.

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Base de Datos MySQL

Base de Datos para pruebas alojada en (https://remotemysql.com).

Cuenta para pruebas.

```bash
usuario: admin@admin.com
contraseña: qweqweqwe
```

## Páginas

`/` - Home. \
`/user` - Panel con información de usuario logeado.\
`/user/userTickets` - Pasajes comprados por usuario.\
`/buyTicket` Formulario para buscar viajes y ver sus detalles.\
`/login` - Formulario para iniciar sesion.\
`/register` - Registro de nuevo usuario.\
`/admin` - Panel de Admin.\
`/admin/login` - Formulario para iniciar sesion como Admin.

## CONFIG

En `next.config.js` están las variables para la configuración en general, no es necesario tocar nada para relizar pruebas.

Para API KEY.
```bash
secret: 'SECRET_:O'
```

Para conexion de API DEV/PROD.
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

En `_app.js` están las rutas de páginas públicas y protegidas.\
En `helpers/api/jwt-middleware` están las rutas de API públicas.

## Falta

Agregar Adaptación para celulares.\
Faltan funciones en panel de ADMIN.\
Cambiar a mysql2.\
Mensajes en validacion dde login de usuario.\
Validación innecesaria para entrar a login de admin.

## Imagenes

![1](https://user-images.githubusercontent.com/53408118/165327161-24cd4a27-4175-48ff-a5fd-49915462e6a3.PNG)
![2](https://user-images.githubusercontent.com/53408118/165327253-5f9d02de-ed9d-4983-b069-204521d4f46c.PNG)
![4](https://user-images.githubusercontent.com/53408118/165327279-84e568ba-d634-4a0a-ba62-23330ec9cf46.PNG)
![3](https://user-images.githubusercontent.com/53408118/165328371-503c61ff-238d-4f00-9b89-aecadb4948e5.PNG)


## More

- [Next.js](https://nextjs.org/docs)
- [Evergreen](https://evergreen.segment.com)
- [Datepicker](https://reactdatepicker.com)
- [react-device-detect](https://github.com/duskload/react-device-detect)
- [Express-JWT](https://github.com/auth0/express-jwt)
