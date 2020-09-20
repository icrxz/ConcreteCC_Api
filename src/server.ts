import cors from 'cors';
import express from 'express';
import routes from './routes';
import connect from "./db";

const app = express();

connect();

app.use(cors());
app.use(express.json());
app.use(routes);

// Acesso a base de dados


app.listen(3000);
