import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import routes from './routes';
import { connect } from "./database";

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Config BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'))

app.use('/api/v1', routes);

connect();

app.listen(4000);
