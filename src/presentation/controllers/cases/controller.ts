import { Request, Response } from "express"
import { CaseModel } from "../../../data/models/case.model"

export class CasesController{
  public getCases = async (req: Request, res:Response) => {
    try {
      const cases = await CaseModel.find()
      return res.json(cases);
    } catch (error){
      return res.json([]);
    }
  };

  public getLatestCases = async (req:Request, res:Response) =>{
    try {
      const lastWeek = new Date()
      lastWeek.setDate(lastWeek.getDate()-7)
      const latestCases = await CaseModel.find({creationDate:{$gte: lastWeek}})
      return res.json(latestCases)
    } catch(error){
      return res.json([]);
    }
  }

  public getCaseById = async (req: Request, res:Response) => {
    try {
      const {id} = req.params;
      const caseById = await CaseModel.findById(id);
      
      if(!caseById){
        return res.json({message: "No se econtró un caso con el id especificado"})
      }

      return res.json(caseById)

    } catch (error){
      return res.json({message: "Ocurrió un error al buscar caso por id"});
    }
  }

  public createCase = async (req:Request, res:Response) =>{
    try {
      const { lat, lng, genre, age } = req.body; //EDAD NO DECIMALES
      const newCase = await CaseModel.create({
        lat,
        lng,
        genre,
        age
      });
      res.json(newCase);
    } catch(error){
      return res.json({message: "Ocurrió un error al crear un caso"})
    }
  }

  public updateCase = async (req:Request, res:Response) => {
    try{
      const {id} = req.params;
      const caseToUpdate = await CaseModel.findById(id)

      if(!caseToUpdate){
        return res.json({message: "No se encontró un caso con el id especificado"})
      }

      const { lat, lng, genre, age } = req.body; //EDAD NO DECIMALES

      await CaseModel.findByIdAndUpdate(id,{
        lat:lat,
        lng:lng,
        genre:genre,
        age:age
      })

      const updatedCase = await CaseModel.findById(id);
      return res.json(updatedCase);
    }catch(error){
      return res.json({message: "Ocurrió un error al actualizar el caso",error})
    }
  }
  
  public deleteCase = async (req:Request, res:Response) => {
    try{
      const {id} = req.params;
      const caseToDelete = await CaseModel.findById(id)

      if(!caseToDelete){
        return res.json({message: "No se encontró un caso con el id especificado"})
      }

      await CaseModel.findByIdAndDelete(id);
      return res.json({message: "Caso eliminado correctamente"})
    }catch(error){
      return res.json({message: "Ocurrió un error al eliminar el caso",error})
    }
  }
}
