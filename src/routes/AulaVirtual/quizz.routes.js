import { Router } from "express";
const router = Router();

import * as quizzCtrl from "../../controllers/AulasVirtuales/quizz.controlles";
import { authJwt } from "../../middlewares";

router.put("/solve/:quizzId",[authJwt.verifyToken], quizzCtrl.solveQuiz); //resolver examen por los estudiantes

router.put("/:aulaId",[authJwt.verifyToken], quizzCtrl.createQuizz); //crear examen

router.put("/remove/:quizzId",[authJwt.verifyToken], quizzCtrl.deleteQuizzById); //eliminamos examen

router.put("/send/:quizzId",[authJwt.verifyToken], quizzCtrl.saveQuestionById); //crear examen options

router.put("/editQuizz/:aulaId",[authJwt.verifyToken], quizzCtrl.editExamById); // editar el examen fecha de entrega

export default router;

