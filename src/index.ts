import 'reflect-metadata'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { routes } from './routes';

import '@database/connect'

dotenv.config();

const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    app.use(cors());
    next();
});
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log('Server running...'))
