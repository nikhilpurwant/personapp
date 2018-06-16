/*
*   Either you can run as node/nodemon server.js
*   Or if json-server is globally installed 
*   json-server db.json --routes routes.json
*   when running server.js routes are part of the API call to json server 
*   and even db.json is included in the code
*   This is running json server as a module within your app.
*   for more go here https://github.com/typicode/json-server
*/
const jsonServer = require('json-server');
const server = jsonServer.create();

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Add custom routes before JSON Server router
server.get('/api/env', (req, res) => {
    res.send({env:process.env.ENV||'UNKNOWN'});
})

server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));

server.use(middlewares)
server.use(router)
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on ${port}`);
})

