
const cluster = require('node:cluster');
const totalCPUs = require('node:os').cpus().length;
const process = require('node:process');

 
const cron = require("node-cron"); // Instancio el paquete 'node-cron' 
const express = require("express"); // Instancio el paquete 'express' 
const app = express();
if (cluster.isMaster) {
  console.log(`Numeros de CPU ${totalCPUs}`);
  console.log(`Principal ${process.pid} corre`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} muerto`);
    cluster.fork();
  });

} else {
  
  Inicio ();
}


function Inicio() {
  // Creo una variable llamada 'app' y en ella coloco el método express(); del paquete 'express' 
  
  // En el campo segundo coloc '*/5' para ejecutar una tarea en consola cada 5 segundos 
  for(i=0; i<=3;i++){
    cron.schedule("*/5 * * * * *", function () {
   
      // Mostramos un par de mensajes con 'console.log()'. Puedes reemplazar el código con una determinada tarea que desees que se ejecute 
      console.log("⌚⌚⌚⌚⌚");
      console.log("Ejecutando una tarea cada 5 segundos");  
      process.exit();
    });
  }
  
   
  // Ejecutamos la aplicación en el puerto 3000
  app.listen(8080);
}
