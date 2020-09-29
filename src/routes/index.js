import { response, Router } from "express";
import scrapingRoutes from "./scraping.routes";

const router = Router();

router.use("/scraping", scrapingRoutes);

export default router;
