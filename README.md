
# API Test

Esta es una API que realiza el filtro de entidades de acuerdo a un rango de identificador y entrega el resultado ordenado alfabéticamente de forma ascendente, de acuerdo a un atributo, en este caso el nombre.

La API se construye teniendo en cuenta the clean architecture y principios SOLID

Para esto y teniendo en cuenta las especificaciones indicadas para la creación de la API, se manejarán algunas dependencias como:

* node.js - expressjs
* axios - Para realizar la petición a la API de donde extraeremos la información
* joi - validación de la integridad de los datos
* @hapi/boom - Para manejo de errores y statuscode

# Pruebas:

Estáticas:

* eslint - necesita tener instalada extensión de visual estudio ESlint oficial

Unitarias:

* jest
* axios-mock-adapter

## API Referencia

Una vez el servidor está funcionando, podemos probar nuestra API

#### Filtrar entidades de acuerdo a rango de identificadores

Tener en cuenta el entorno en el que se encuentra para saber a donde hacer la petición. Todo el código tiene la opción de configurar variables de entorno, entre las que encontramos el entorno y el puerto.

La aplicación correrá por defecto en el puerto "3000" y el entorno "dev"

```http
  POST /dev/entity/v2.1/entities/filter
```

| Parameter | Type      | Description                        |
| :-------- | :-------- | :--------------------------------- |
| `startId` | `integer` | **Required**. Id inicial del rango |
| :-------- | :-------- | :--------------------------------- |
| `endId`   | `integer` | **Required**. Id final del rango   |

Tener en cuenta que se van a realizar todas las validaciones de datos para realizar la petición correctamente, y en caso de no cumplir con las validaciones se mostrará el error correspondiente de acuerdo a las indicaciones dadas para la creación de la API.

# Instalación

Para instalar la app y poder probar el path descrito anteriormente, siga los siguientes pasos:

* Descargue el repositorio y ubíquese en su carpeta local donde tendrá la app
* Puede crear la imagen con para utilizarla en la creación de un contenedor con:
```docker build -t co.com.soyyo.entity.filter-dev-1_0_0 .```
* O si lo prefiere, directamente puede ejecutar el comando:
```docker-compose up``` de esta manera creará el contenedor con la imagen y verá los logs del contenedor, en donde verá que las pruebas unitarias corren de manera correcta y se levanta el servidor.
* Una vez está corriendo el servidor podemos probar en un cliente Rest como insomnia o postman
