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

`/` - Home
`/user` - Panel con información de usuario logeado, en caso de no estar logeado redirige a login.
`/admin` - Formulario para crear nuevos Viajes.
`/buyTicket` Formulario para buscar viajes y ver sus detalles.
`/login` - Ya tu sabes
`/register` - Tambien sabes

## Base de Datos MySQL

La base de datos está alojada en Amazon RDS

## Otros

En `/config` está el archivo `db.js` el cual tiene la configuración de la BD MySQL

```bash
host: '',
user: '',
password: '',
port: 3306,
database: ''
```

## TODO

Middleware
Función de compra
Mover variables para encriptar token

## More

- [Next.js](https://nextjs.org/docs)
- [Evergreen](https://evergreen.segment.com)
- [Datepicker](https://reactdatepicker.com)
- [react-device-detect](https://github.com/duskload/react-device-detect)
- [ServerlessMySQL](https://github.com/jeremydaly/serverless-mysql)
