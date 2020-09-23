import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import routes from './routes';
import { connect } from "./database";

require('dotenv').config();

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares() {
    this.express.use(cors());
    this.express.use(express.json());

    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }));

    this.express.use(morgan('dev'))
  }

  private database() {
    connect();
  }

  private routes() {
    this.express.use('/api/v1', routes);
  }
}

export default new App().express;
