import { Router } from "express";
import { CasesRoutes } from "./controllers/cases/routes";

export class AppRoutes{
  static get routes(): Router{
    const router = Router();
    router.use("/api/monoMap",CasesRoutes.routes);
    return router;
  }
}