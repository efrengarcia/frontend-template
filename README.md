FrontEnd Template
==============
Este es un template para crear aplicaciones web. Se construye a través de tareas Gulp y dependencias web a través Bower.

Para poder levantar la aplicación, son necesarios los siguientes pasos:

* Instalar NodeJS (se ocupa para gestionar paquetes vía NPM) desde el siguiente [link](https://nodejs.org/download/).

* Instalar Gulp y Bower a través de NPM:
```sh
$npm install -g gulp
$npm install -g bower
```

* Instalar dependencias de npm desde el repositorio donde se encuentra el archivo Gulpfile.js:
```sh
$ npm install
```
* Instalar dependencias de bower desde la misma ubicación:
```sh
$bower install
```
* Iniciar el proyecto a través de gulp:
```sh
$gulp
```

Una vez ejecutado el comando el proyecto se desplegará en [esta dirección](localhost:8000).
