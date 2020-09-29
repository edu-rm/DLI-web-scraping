import { Router } from "express";
import ScrapingController from "../controllers/ScrapingController";

const scrapingController = new ScrapingController();

const router = Router();

router.get("/general", scrapingController.index);

export default router;
