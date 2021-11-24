import Aulavirtual from "../../models/aulavirtual/Aulavirtual";
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

//----------------------------------------------------CREAR UNA NUEVA TAREA [DOCENTES, ]
export const createTaskById = async (req, res) => {
  try {
    await Aulavirtual.findByIdAndUpdate(
      req.params.aulaId,
      { $push: { task: req.body.task } },
      {
        new: true,
      }
    );
    res.status(200).json(req.params.aulaId);
  } catch (e) {
    res.status(500).json("error del servidor");
  }
};

//----------------------------------------------------EDITAR TAREA [DOCENTES, ]
export const editTaskById = async (req, res) => {
  try {
    let cadenaId = req.params.aulaId;
    const array = cadenaId.split(",");
    if (array[0] != null && array[1] != null) {
      await Aulavirtual.updateOne(
        { _id: array[0], "task._id": array[1] },
        { $set: { "task.$": req.body.task } },
        {
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } else {
      res.status(200).json("req.params.aulaId");
    }
  } catch (e) {
    console.log(e)
    res.status(500).json("error del servidor");
  }
};

//------------------------------------- INSERTA TAREAS [ESTUDIANTES, ]

export const createTaskArbol2ById = async (req, res) => {
  try {
    console.log(req.body)
    await Aulavirtual.updateOne(
      { "task._id": req.params.taskId },
      { $push: { "task.$.entrega": req.body.task.entrega } },
      {
        new: true,
      }
    );
    res.status(200).json("crearnote");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "No mat found" });
  }
};

//------------------------------------- ELIMINAR TAREAS [DOCENTE, ]

export const deleteTaskById = async (req, res) => {
  try {
    let cadenaId = req.body;
    await Aulavirtual.updateOne(
      { _id: req.params.taskId },
      { $pull: { task: { _id: cadenaId } } },
      {
        new: true,
      }
    );
    res.status(200).json("crearnote");
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
};
