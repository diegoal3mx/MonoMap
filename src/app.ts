import express from 'express'
import { AppRoutes } from './presentation/routes';

const app = express();

app.use(express.json());
app.use(AppRoutes.routes);