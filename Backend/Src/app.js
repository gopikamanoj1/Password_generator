// app.js
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import session, { MemoryStore } from 'express-session';
import serverConfig from './server.js';
import connectDB from './Config/db.connect.js';
import  {routes} from './Adapters/Routes/index.js'
import config from './Config/config.js';
import expressConfig from './express.js';
import dependencies from './Frameworks/Config/dependencies.js';

// Load environment variables
dotenv.config(); 

// Initialize express app and server
const app = express();
const server = http.createServer(app);

// Connect to the database
connectDB(config);

// Configure session store and options
const store = new MemoryStore();
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
};
app.use(session(sessionOptions));

// Configure Express
expressConfig(app);

// Setup routes
app.use('/api', routes(dependencies));

// Start the server
serverConfig(server, config).startServer();
