const express = require('express');
const bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./api/routes/porExtensoRoutes'); // importing route
routes(app); // register the route

app.listen(port);
console.info(`App started on port ${port}`);
