# AtomChallengeBackend

El proyecto se generó con express 5.1.0 y firebase-admin 12.6.0 y firebase-functions 6.0.1

## Install

## Inicio Firebase: Realizar los pasos si aun no lo hemos hecho en frontend
- Validar si se tiene firebase instalado globalmente
`firebase --version`

- Si no se tiene firebase, instalar globalmente 
`npm install -g firebase-tools`

- Realizar login de firebase, para conectarse y visualizar los proyectos existentes
`firebase login`

- Crear proyecto en consola firebase:
`https://console.firebase.google.com` -> `Add Project` -> `Crear proyecto`
## Fin Firebase

## Base de datos: Para produción
- Crear la base de datos
`Firebase Database`-> `Crear base de datos` -> `Standard` -> `default y us-central1` -> `Modo producción y Crear`

- Ir a reglas y ver si se ha publicado la regla por defecto

- Crear índices
`Collection: tasks`
`deleted Ascendente`
`userId Ascendente`
`createdAt Descendente`
## Fin Base de datos

## Elegir proyecto firebase

- Luego usar el proyecto creado o existente
`firebase init functions`

- Luego vamos a la ruta del frontend e instalemos las dependencias 
`npm i`

## Development server

Para compilar y probar localmente primero debemos de ir dentro de la carpeta `functions` y usar
`npm run serve:local` se compila y se ejecuta el servidor sin escuchar cambios en tiempos de desarrollo

Si se quiere hacer cambios y el servidor reiniciarse usar

`npm run build:watch` y en otro terminal `npm run serve`

cada vez que se haga un cambio, el servidor se reinicia

## Deployment

## Generar si aun no lo hemos hecho en el front
Activar Blaze
`https://console.firebase.google.com/project/banckend-tasks/usage/details`

Y en google Cloud console
`Google Cloud Console → IAM & Admin → Service Accounts → Create. `

Agregar roles:
`Firebase Hosting Admin`
`Service Account User`

Otro rol: Buscar <PROJECT_NUMBER>-compute@developer.gserviceaccount.com
`PROJECT_NUMBER: se busca en detalle del proyecto consola de firebase`
Luego:
`Cloud Datastore User (Firestore usa Datastore API en IAM):`
`Abre Google Cloud Console → IAM → IAM.`
`Busca esa cuenta (-compute@developer.gserviceaccount.com).`
`Editar → Agregar otro rol → Cloud Datastore User → Guardar.`

Descarga la KEY y agregarlo en el secrets en github
`Settings → Secrets and variables → Actions → New repository secret`
`FIREBASE_SERVICE_ACCOUNT_BANCKEND_TASKS`

Para generar el despliegue a firebase realizar push a la rama develop

## Architecture

Arquitectura inspirada en Clean Architecture / Hexagonal / DDD light, con separación explícita por capas: domain, application (casos de uso), infrastructure (adaptadores Firestore) e interfaces (Express + HTTP).

Se espera `code` como cabecera el id del usuario logeado