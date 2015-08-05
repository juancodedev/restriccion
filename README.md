# Tengo Restricción?
[![Build Status](https://travis-ci.org/SantiagoLab/tengo-restriccion.svg)](https://travis-ci.org/SantiagoLab/tengo-restriccion)

App para notificación de restricción vehicular, en Santiago de Chile, según patente

http://www.tengorestriccion.cl/

## Arquitectura y Diseño del Sistema

### index.js (App Entrypoint):
  - Inyección de [Babel](https://babeljs.io/) Runtime para utilizar sintaxis de ES6/7 (ES2015/2016) a través del proyecto
  - Apertura de conexión a [MongoDB](https://www.mongodb.org/)
  - Consulta por los últimos datos de restricción guardados en mongoDB, si no existen datos previos se corre el proceso de obtención y guardado por medio de Scraping con [Request](https://github.com/request/request) y [Cheerio](https://github.com/cheeriojs/cheerio)
  - Se encola el proceso recurrente de Scraping y notificación de usuarios a través de [Kue](https://github.com/Automattic/kue) y [Redis](http://redis.io/)
  - Se corre el servidor http ``` server.js ``` con [Koa](https://github.com/koajs/koa)

### server.js (HTTP Server):
  Se utiliza [Koa](https://github.com/koajs/koa) como plataforma para el servidor; la decisión de usarlo en vez de el mas popular [Express](https://github.com/strongloop/express) se debe a el manejo de código asíncrono por medio de promesas y co-rutinas (y próximamente Async/Await) que nos entrega Koa, ademas de lo liviano, modular y flexible de la misma librería.
  - Utilizamos [Helmet](https://github.com/helmetjs/helmet) como middleware de seguridad contra XSS, CSRF y para el seteo de headers CSP
  - El logging de la Aplicación se hace por medio de [Bunyan](https://github.com/trentm/node-bunyan)
  - Establecemos las rutas/endpoints y asignamos sus handlers desde ``` app/controllers ``` y ``` app/client/index.js ```

### app/server/index.js (Server AppHome Entrypoint):
  El handler para la renderizacion de la Single Page App desde el lado del servidor. El frontend de la Aplicación esta construido con [React](https://github.com/facebook/react) y la renderizacion se comparte entre servidor y cliente
  - Se carga la vista principal ``` app/views/main.html ``` y se le inserta:
    - El estado inicial de la UI con los últimos datos de restricción recolectados, cargados desde MongoDb
    - La renderizacion de los componentes de react desde la raiz ``` app/components/App.jsx ```
  - El estado de los componentes se maneja con [Redux](https://www.npmjs.com/package/redux)

### app/client/index.js (Client AppHome Entrypoint):
  Punto de entrada para la renderizacion y todo el código para el lado del cliente de la Single Page App. El frontend de la Aplicación esta construido con [React](https://github.com/facebook/react) y la renderizacion se comparte entre servidor y cliente
  - Se carga el estado inicial inyectado por el primer render desde el servidor y se inserta en los componentes a través de [Redux](https://www.npmjs.com/package/redux)
  - Se renderizan los componentes de react desde la raiz ``` app/components/App.jsx ```
  - El estado de los componentes se maneja con [Redux](https://www.npmjs.com/package/redux)


## Experiencia de Desarrollo (DX)
  - Para correr el entorno de desarrollo basta con correr el script ``` npm start ```
  - El entorno de desarrollo consiste del servidor principal (a través de index.js), un proceso de Bundle y Hot-loading continuo para el código del lado del cliente con [Webpack](https://github.com/webpack/webpack) y un watcher para la compilacion en demanda de los estilos SASS con [node-sass](https://github.com/sass/node-sass)
  - [Webpack](https://github.com/webpack/webpack) nos permite hacer cambios en los archivos js que utiliza el bundle del cliente y ver los cambios en vivo en el browser, y debuggear los mismos sin necesidad de refrescarlo manualmente o herramientas externas
  - [Nodemon](https://github.com/remy/nodemon) escucha cualquier cambio en los archivos del servidor y vuelve a correr el entorno cada vez que haya un cambio en estos
  - Dependencias de Sistema:
    - [iojs](https://iojs.org/en/index.html) v2.3.3 +
    - [MongoDB](https://www.mongodb.org/) 2.6 +
    - [Redis](http://redis.io/) 3.0 +
    - [Nodemon](https://github.com/remy/nodemon) 1.3 + instalado globalmente (``` npm install nodemon -g ```)

## Contribución
  Si tienes ganas de aportar al proyecto te invitamos a hacerlo a de las siguientes maneras:

  - Si encuentras un bug o quieres proponer una mejora por favor abre un [Issue](https://github.com/SantiagoLab/tengo-restriccion/issues) en Github
  - Si quieres ayudar con un pull request que soluciona o documenta algún Issue, bug o error puedes:
    - Agregar tests que representen el o los errores a resolver (los tests deben ir asociados en una carpeta \__test__ a los módulos que testean)
    - Agregar código que haga pasar estos tests
  - Si quieres aportar con la documentación puedes enviar un pull request con tus cambios


![http://www.tengorestriccion.cl/imgs/logo-santiagolab-negro.svg](http://santiagolab.cl)
