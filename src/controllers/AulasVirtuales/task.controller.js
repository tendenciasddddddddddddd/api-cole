import Aulavirtual from "../../models/aulavirtual/Aulavirtual";

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
        { _id: array[0]},
        { $set: { 
                  "task.$[perf].nombre": req.body.task.nombre,
                  "task.$[perf].descripcion": req.body.task.descripcion,
                  "task.$[perf].archivo": req.body.task.archivo,
                  "task.$[perf].finicio": req.body.task.finicio,
                } 
        },
        {
          arrayFilters: [{
            "perf._id": {$eq : array[1]}}],
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

//----------------------------------------------------CALIFICAR TAREA [DOCENTES, ]
export const calificarTaskById = async (req, res) => {
  try {
    let cadenaId = req.params.aulaId;
    const array = cadenaId.split(",");
    if (array) {
      await Aulavirtual.updateOne(
        { _id: array[0] },
        { $set: 
          { 
            "task.$[perf].entrega.$[est].nota": req.body.nota,
            "task.$[perf].entrega.$[est].observar": req.body.observar
          } 
        },
        {
          arrayFilters: [{
            "perf._id": {$eq : array[1]}},
            {"est._id": {$eq : array[2]}}],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } else {
      res.status(200).json("req.params.aulaId");
    }
  } catch (e) {
    res.status(500).json("error del servidor");
  }
};


//----------------------------------------------------MARCAR COMO TAREA REVISADA [DOCENTES, ]
export const reviewTaskById = async (req, res) => {
  try {
    let cadenaId = req.params.aulaId;
    const array = cadenaId.split(",");
    if (array) {
      await Aulavirtual.updateOne(
        { _id: array[0] },
        { $set: 
          { "task.$[perf].estado": '1'} 
        },
        {
          arrayFilters: [{
            "perf._id": {$eq : array[1]}}],
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
    await Aulavirtual.updateOne(
      { "task._id": req.params.taskId },
      { $push: { 
                 "task.$.entrega": req.body,
                } 
      },
      {
        new: true,
      }
    );
    res.status(200).json("crearnote");
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
};
//----EDITAMOS LA ENTREGA DE TAREAS POR PARTE DE OS ESTUDIANTES
export const updateTaskSend = async (req, res) => {
  try {
    let cadenaId = req.params.taskId;
    const array = cadenaId.split(",");
    if (array) {
      await Aulavirtual.updateOne(
        { _id: array[0] },
        { $set: 
          { 
            "task.$[perf].entrega.$[est].link": req.body.link,
            "task.$[perf].entrega.$[est].comentario": req.body.comentario,
          } 
        },
        {
          arrayFilters: [{
            "perf._id": {$eq : array[1]}},
            {"est._id": {$eq : array[2]}}],
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

export const updateCodigoCourse = async (req, res) => {
  const updatedProduct = await Aulavirtual.findByIdAndUpdate(
    req.params.aulaId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedProduct);
}
