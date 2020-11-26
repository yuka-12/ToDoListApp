# System description

production: https://todolistapp-yuka-12.netlify.app/  
ToDoList style CRUD web application.  
Frontend works with React (create-react-app) and Redux, Backend works with PHP.  
Those systems work respectively on different servers.  

In local environment Frontend works on server built by npm (prepared in create-react-app), and Backend works on apache server built by docker-compose.

# Directory description

```
├── Procfile  - Procfile for deploy on Heroku
├── README.md 
├── api  - Backend files with PHP
├── composer.json  - composer file for deploy on Heroku
├── docker  - Docker-compode files for local environment of Backend
└── my-app  - Frontend files with React(create-react-app)/Redux
```

# How to set up local environment

## Frontend

Run this command in `my-app` folder.  
```
$ npm start
```

To tell the client side server to proxy any unknown requests to the server side server, add a proxy field to your `package.json`  
```
"proxy": "http://localhost:5000",
```

If connection between the client side and the server side doesn't work with this, configure proxy manually.  
First, install http-proxy-middleware using npm or Yarn:  
```
$ npm install http-proxy-middleware --save
$ # or
$ yarn add http-proxy-middleware
```

Next, create `src/setupProxy.js` and place the following contents in it:  
```
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```

You can check detail here https://create-react-app.dev/docs/proxying-api-requests-in-development

## Backend

Run this command in `docker` folder.
```
$ docker-compose up -d
```

When stopping this server, run this command. 
```
$ docker-compose down
```

## Database

Connect to Database on docker container (I recommend to use database visualization tools such as mysqlworkbench), and execuse these queries to create necessary tables.
```
CREATE TABLE `ToDoList`.`todolist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=902 DEFAULT CHARSET=latin1
```
```
CREATE TABLE `ToDoList`.`users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(60) NOT NULL,
  `password` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1
```

