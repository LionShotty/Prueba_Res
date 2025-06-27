const app = require('./app/app');
const config = require ('./app/config/configuracion');
<<<<<<< HEAD

=======
const conexion = require('./app/config/conexion');

conexion.connect()
>>>>>>> a5f59c0 (Configuracion en el archivo servidor para crear una conexion a la base de datos)

app.listen(config.PORT, () => {
  console.log(`Aplicacion corriendo en puerto ${config.PORT}`);
});
