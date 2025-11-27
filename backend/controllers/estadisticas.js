const { Pedido, Usuario, Articulo, Detalle_Pedido, Calificacion } = require("../models");
const { Op, Sequelize } = require("sequelize");

// 1. Pedidos según su estado
const pedidosPorEstado = async (request, response) => {
  try {
    const todosPedidos = await Pedido.findAll();
    
    const resultado = {};
    todosPedidos.forEach(pedido => {
      if (!resultado[pedido.estado]) {
        resultado[pedido.estado] = 0;
      }
      resultado[pedido.estado]++;
    });

    const data = Object.keys(resultado).map(estado => ({
      estado: estado,
      cantidad: resultado[estado]
    }));

    return response.status(200).json({
      status: "success",
      data: data
    });
  } catch (error) {
    console.error("Error en pedidosPorEstado:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};



module.exports = {
  pedidosPorEstado,
 
};
