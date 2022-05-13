## Busystem

Proyecto simple en el que se puede:

Como USUARIO:\
-Comprar Pasajes.\
-Ver tus Pasajes comprados.

Como ADMINISTRADOR:\
-Ver todos los Pasajes.\
-Ver y Bloquear a Usuarios.\
-Ver, Crear, Modificar y Eliminar los Viajes.\
-Ver, Crear, Modificar y Eliminar los Buses.(todavía no)

Verificación con JWT

DEMO: https://busystem.vercel.app/

## Pruebas locales

```bash
npm i
npm run dev
```

[http://localhost:3000](http://localhost:3000)

Cuenta para pruebas(admin y user)

```bash
usuario: admin@admin.com
contraseña: qweqweqwe
```

Nota: Para entrar a CPanel debe estar logeado como usuario y admin.

## Base de Datos MySQL

Base de Datos para pruebas alojada en (https://remotemysql.com).\

## Páginas

`/` - Home. \
`/user` - Panel con información de usuario logeado.\
`/user/userTickets` - Pasajes comprados por usuario.\
`/buyTicket` Formulario para buscar viajes y ver sus detalles.\
`/login` - Formulario para iniciar sesion.\
`/register` - Registro de nuevo usuario.\
`/admin` - Panel de Admin.\
`/admin/login` - Formulario para iniciar sesion como Admin.

## Falta

Adaptar para celulares.\
Faltan funciones en panel de ADMIN.\
Cambiar a mysql2.\
Mensajes en validacion de login de usuario.\
Validación innecesaria para entrar a login de admin(Sacar de rutas protegidas).\
Validaciones al comprar y mostrar asientos disponibles.\
Estados de viaje.\
Cambiar imagenes a rutas locales.\
Validar selección de fecha al buscar pasaje.


## Imagenes

![1](https://user-images.githubusercontent.com/53408118/165327161-24cd4a27-4175-48ff-a5fd-49915462e6a3.PNG)
![2](https://user-images.githubusercontent.com/53408118/165327253-5f9d02de-ed9d-4983-b069-204521d4f46c.PNG)
![4](https://user-images.githubusercontent.com/53408118/165327279-84e568ba-d634-4a0a-ba62-23330ec9cf46.PNG)
![3](https://user-images.githubusercontent.com/53408118/165328371-503c61ff-238d-4f00-9b89-aecadb4948e5.PNG)


## More

- [Next.js](https://nextjs.org/docs)
- [Evergreen](https://evergreen.segment.com)
- [Datepicker](https://reactdatepicker.com)
- [Express-JWT](https://github.com/auth0/express-jwt)
- [RemoteMySQL](https://remotemysql.com)
