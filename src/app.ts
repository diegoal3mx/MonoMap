import express from 'express'
import { AppRoutes } from './presentation/routes';
import { MongoDatabase } from './data/models/init';
import { envs } from './config/envs.plugin';
import { emailJob } from '../domain/jobs/email.job';
import { CaseModel } from './data/models/case.model';

const app = express();

app.use(express.json());
app.use(AppRoutes.routes);

(async () =>
  await MongoDatabase.connect({dbName:"MonoMapApi",mongoUrl:envs.MONGO_URL ?? ""}))();
  
  console.log(envs.PORT)

  app.listen(envs.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${envs.PORT}`)
    emailJob();
  })
  
  app.post("/",async(req,res)=>{
    const {genre,age,lat,lng} = req.body
    const newIncident = await CaseModel.create({genre,age,lat,lng})
    res.send("Registro creado")
  })