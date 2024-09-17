import cron from 'node-cron';
import { CaseModel } from '../../src/data/models/case.model';
import { EmailService } from '../services/email.service';
import { generateCaseEmailTemplate } from '../templates/email.template';
import { envs } from '../../src/config/envs.plugin';
export const emailJob = () => {
  const emailService = new EmailService();

  cron.schedule("*/10 * * * * *", async ()=>{
    try{
      const allCases = await CaseModel.find({isSent:false});
      if(!allCases.length){
        console.log('No hay casos por enviar');
        return
      }
      await Promise.all(
        allCases.map(async (Case)=>{
            console.log(Case);
            try{
              const htmlBody= generateCaseEmailTemplate(Case.creationDate,Case.genre,Case.age,Case.lat,Case.lng);

                await emailService.sendEmail({
                    to: envs.MAIL_TO,
                    subject:`Caso: ${Case.creationDate}`,
                    htmlBody:htmlBody
                });
                console.log(`Email enviado para el caso con Id: ${Case._id}`);
                let updateCase = {
                    lat: Case.lat,
                    lng: Case.lng,
                    genre: Case.genre,
                    age: Case.age,
                    creationDate: Case.creationDate,
                    isSent: true
                };
                await CaseModel.findByIdAndUpdate(Case._id,updateCase);
                console.log(`Caso actualizado para el Id: ${Case._id}`);
            }
            catch(error){
                console.error("Error al procesar el caso");
            }
        })
    );}
    catch(error){
      console.error("Error al enviar el email");
    }
  });
}

