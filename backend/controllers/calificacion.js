const { Calificacion } = require("../models");
const { getAllItems } = require("./articulo");

const getAllCalificaciones = async (request, response) => {
  try {
    const calificaciones = await Calificacion.findAll({
      attributes: [
        "id_calificacion",
        "id_pedido",
        "puntuacion",
        "comentario",
        "fecha_calificacion",
      ],
    });
    return response.status(200).json({
      status: "success",
      data: calificaciones,
    });
  } catch (error) {
    console.error("Error en getAllCalificaciones:", error);
    return response.status(500).json({
      status: "error",
      message: "Error al obtener las calificaciones",
    });
  }
};

const createNewCalificacion = async (request, response) => {
  const { id_pedido, puntuacion, comentario } = request.body;
  try {
    const newCalificacion = await Calificacion.create({
      id_pedido,
      puntuacion,
      comentario,
    });
    return response.status(201).json({
      status: "success",
      data: newCalificacion,
    });
  } catch (error) {
    console.error("Error en createNewCalificacion:", error);
    return response.status(500).json({
      status: "error",
      message: "Error al crear la calificación",
    });
  }
};

const deleteCalificacion = async (request, response) => {
  const { id } = request.params;
  try {
    const calificacion = await Calificacion.findByPk(id);
    if (!calificacion) {
      return response.status(404).json({
        status: "Not Found",
        message: "Calificación not found",
      });
    }
    await calificacion.destroy();
    return response.status(200).json({
      status: "success",
      message: "Calificación deleted successfully",
    });
  } catch (error) {
    console.error("Error en deleteCalificacion:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getAllCalificaciones,
  createNewCalificacion,
  deleteCalificacion,
};
