// express.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session, { MemoryStore } from 'express-session';

const expressConfig = (app) => {
  app.use(bodyParser.json({ limit: '5000mb' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIEPARSERSECRET));
  app.use(express.static('public/'));

  app.use(
    cors({
      origin: ['http://localhost:5173'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );
};

export default expressConfig;


