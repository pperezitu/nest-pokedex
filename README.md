<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado 
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Para correr el BFF usar:
```
npm run start:dev
``` 
6. O tambien podemos usar 
```
nest start --watch
```
7. Clonar el archivo ```.env.template``` y renombrar a ```.env```

8. Llenar la variables de entorno definidas en el ```.env```

9. Reconstruir la base de datos con la semilla, desde postman con la URL
```
http://localhost:3000/api/v2/seed
```

# Build de Producción

1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de producción
3. Crear la nueva imagen 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```





## Stack Usado
* MongoDB
* Nest