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
`/user` - Panel con información de usuario logeado, en caso de no estar logeado redirige a login.\
`/admin` - Formulario para crear nuevos Viajes.\
`/buyTicket` Formulario para buscar viajes y ver sus detalles.\
`/login` - Ya tu sabes\
`/register` - Tambien sabes\

## Base de Datos MySQL

users

```bash
CREATE TABLE `busystem`.`users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `lastName` VARCHAR(20) NOT NULL,
  `rut` VARCHAR(20) NOT NULL,
  `phone` INT NULL,
  `email` VARCHAR(30) NOT NULL,
  `hash` VARCHAR(60) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUsers`),
  UNIQUE INDEX `rut_UNIQUE` (`rut` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
```

travels

```bash
CREATE TABLE `busystem`.`travels` (
  `idtravel` INT NOT NULL AUTO_INCREMENT,
  `origen` VARCHAR(45) NOT NULL,
  `destino` VARCHAR(45) NOT NULL,
  `costoViaje` INT NOT NULL,
  `limitePasajeros` INT NULL,
  `horaSalida` INT NOT NULL,
  `idMaquina` INT NULL,
  `dias` VARCHAR(120) NOT NULL,
  PRIMARY KEY (`idtravel`));
```

tickets

```bash
CREATE TABLE `busystem`.`tickets` (
  `idTicket` INT NOT NULL AUTO_INCREMENT,
  `idTravel` INT NOT NULL,
  `idUser` INT NOT NULL,
  `nroAsiento` INT NOT NULL,
  `clase` VARCHAR(15) NULL,
  `fecha` INT NOT NULL,
  PRIMARY KEY (`idTicket`));
```

## Otros

En `/config` está el archivo `db.js` el cual tiene la configuración para la BD MySQL

```bash
host: '',
user: '',
password: '',
port: 3306,
database: ''
```

## TODO

Middleware \
Función de compra \
Mover variables para encriptar token \

## More

- [Next.js](https://nextjs.org/docs)
- [Evergreen](https://evergreen.segment.com)
- [Datepicker](https://reactdatepicker.com)
- [react-device-detect](https://github.com/duskload/react-device-detect)
- [ServerlessMySQL](https://github.com/jeremydaly/serverless-mysql)
