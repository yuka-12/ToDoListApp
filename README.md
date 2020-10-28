# System description

ToDoList style CRUD web application.  
Client side works with React (create-react-app), server side works with PHP.  
Those system work respectively on different servers.  

In local environment client side works on server built by npm (prepared in create-react-app), and server side works on apache server built by docker-compose.

# How to work in local environment

## client side

Run this command in my-app folder.  
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

## Server side

Run this command in `docker` folder.
```
$ docker-compose up -d
```

When stopping this server, run this command. 
```
$ docker-compose down
```
