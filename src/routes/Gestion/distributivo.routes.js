import { Router } from "express";
const router = Router();

const { cacheInit } = require("../../middlewares/cache")

import * as distributivoCtrl from "../../controllers/Gestion/distributivo.controller";
import { authJwt } from "../../middlewares";

router.get("/nuedist",[authJwt.verifyToken], cacheInit, distributivoCtrl.getInfoDistributivo);

router.get("/:distributivoId",[authJwt.verifyToken], distributivoCtrl.getDistributivoById);

router.post("/",[authJwt.verifyToken], distributivoCtrl.createDistributivo);

router.get("/",[authJwt.verifyToken], distributivoCtrl.getDistributivo);



router.put("/:distributivoId",[authJwt.verifyToken], distributivoCtrl.updateDistributivoById);

router.delete("/:id",[authJwt.verifyToken], distributivoCtrl.deleteDistributivoById);

export default router;