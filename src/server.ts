import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';
import { connect } from "./database";

const app = express();

connect();

app.use(cors());
app.use(express.json());

// Config BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.listen(3000);
