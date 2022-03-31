This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Instalar dependencias

```bash
npm i
```

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Páginas

`/` - Página principal
`/user` - Panel con información de usuario logeado, en caso de no estar logeado redirige a login.
`/admin` - Formulario para crear nuevos Viajes.
`/buyTicket` Formulario para buscar viajes y ver sus detalles.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
