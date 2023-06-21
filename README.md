# MADEA Backend

Tabla de contenido

- [Instalación](#install)
- [Flujos](#flow)
- [Estructura de folders](#Structure)
  1. [Capas](#layers)
- [Batches](#Batch)

<a name="install"></a>

# Instalación

Instalar las dependencias

```terminal
$ npm install
```

Se necesitan variables de entorno para conectarte a la base de datos y un whitelist

```terminal
  MONGO_USER=""
  ATLAS_PASSWORD=""
```

Para correr en modo staging

```terminal
$ npm run dev
```

<a name="flow"></a>

# MVC

```mermaid
graph TB
    subgraph Model
    Services -->Models
    Models
    end
    subgraph Controller
    Validator-->Middlewares
    Middlewares-->Controllers
    Controllers-->Services
    Services-->Controllers
    end
    subgraph View
    Routes-->Validator
    end
```

# Flujo general

```mermaid
sequenceDiagram
    Route->>Validator: /api/v1/provider
    Validator->>Middleware: {first_name: 'Pedro'...}
    Middleware->>Controller: Lógica del enpoint
    Controller->>Services: Consultas a la base de datos
    Note over Controller,Controller: Response 200
    Services->>Controller: Respuestas de base de datatos
```

<a name="Structure"></a>

# Estructura de folders

    .
    ├── config        # Configuración para conectarse a la base de datos.
    ├── controllers   # Logica de los enpoints
    ├── data          # Pendiente
    ├── middlewares   # Middlewares de modelos y auth
    ├── validators    # Validators de body
    ├── models        # Modelos de la base de datos
    ├── routes        # Rutas de la API
    ├── server        # Configuración inicial de todo el server
    ├── services      # Consultas a las base de datos
    ├── utils         # Utilidades comunes
    └── index.js      # Archivo que levanta el server

<a name="layers"></a>

# Capas

## server:

> Configura e inicializa el server y la conexión a la base de datos, implementa las rutas y middlewares generales como sentry y whitelist.

## routes:

> Crea las rutas destinadas y manda a llamar a los controllers, existen dos tipos de rutas `publicRoutes` y `privateRoutes`

    .
    ├── ...
    ├── routes                    # Rutas de la API
    │   ├── ModelRoutes.js        # Convención del nombre
    │   ├── PublicRoutes.js       # Se mandan a llamar las rutas publicas
    │   ├── PrivateRoutes.js      # Se mandan a llamar las rutas privadas
    │   └── index.js              # Concentra las rutas privadas y privadas
    └── ...

## controllers:

> Lleva la lógica de cada enpoint depende de los `services`para pdoer conectare a la base de datos, solo se ejcutan y pasa exitasamente por `validators` y `middlewares`

    .
    ├── ...
    ├── controllers                    # Logica de los enpoints
    │   └── ModelControlller.js        # Convención del nombre
    └── ...

## models:

> Modelos de la base de datos para mongoose

    .
    ├── ...
    ├── models                    # Modelos de la base de datos
    │   └── Model.js              # Convención del nombre
    └── ...

## services:

> Capa que solo se dedica a hacer consultas a la base de datos

    .
    ├── ...
    ├── models                    # Consultas a las base de datos
    │   └── ModelService.js       # Convención del nombre
    └── ...

## utils:

> Scripts, archivos o funciones que se ocupan genericamente

    .
    ├── ...
    ├── utls                    # Utilidades comunes
    │   ├── sendEmal.js         # Funcion genericas para enviar mails
    │   ├── const.js            # Constantes del proyecto
    │   ├── ...                 # Archivos o funciones genericas
    └── ...

## middlewares:

> Funciones que se encargan de validar querys comunes a la base de dato y lo agregan al objeto `req`

    .
    ├── ...
    ├── middlewares               # Middlewares de modelos y auth
    │   ├── basicAuth.js          # Auth básico
    │   ├── checkToken.js         # Valida el jwt
    │   └── ModelsMiddleware.js   # Middlewares de modelos directos a la base.
    └── ...

## validators:

> Se encargan de validar el body que el usuario envia, tipo de datos y contenido

    .
    ├── ...
    ├── validators                # Validators de body
    │   └── ModelValidator.js     # Convención del nombre
    └── ...
