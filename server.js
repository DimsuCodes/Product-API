import 'dotenv/config'; // loads values from my .env file into process.env

import connection from './config/connection.js';
connection();

import express from 'express'; // imwporting express to build a server and api routes.
import productRoutes from './routes/productRoutes.js'; //


const app = express(); //creates the express application and saves it in a variable called app 'const app' = the name    &   'express()' = creates the application.
const port = process.env.PORT

//then we use app ro add routes, middleware and to start the server.

app.use(express.json()); //The middleware.

app.use('/api/products', productRoutes); //mounting the server

app.listen(port, () => console.log(`http://localhost:${port}`)); // starts the express server and tells it which port to listen to for incoming requests
