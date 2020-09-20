import cors from 'cors';
import express from 'express';
import routes from './routes';
import { connect } from "./database/db";

const app = express();

connect();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000);
