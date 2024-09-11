import { Router } from "express";
import { CasesController } from "./controller";

export class CasesRoutes{
  static get routes(): Router{
    const router = Router();
    const controller = new CasesController();
    router.get('/', controller.getCases);
    router.get('/:id', controller.getCaseById);
    router.post("/", controller.createCase);
    router.put("/:id", controller.updateCase);
    router.delete("/:id", controller.deleteCase);
    return router;
  }
}