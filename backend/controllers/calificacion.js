const { Calificacion } = require("../models");

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

module.exports = {
  getAllCalificaciones,
};
