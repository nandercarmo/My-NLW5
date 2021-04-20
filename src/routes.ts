import { Router } from "express";
import { SettingsController } from "./controllers/SettingsController";

const routes =  Router();

const settingsControler = new SettingsController();

routes.post("/settings", (req, res) => settingsControler.create(req, res));

export { routes };