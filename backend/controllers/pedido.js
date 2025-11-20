const { Pedido, Usuarios } = require("../models");

const createNewPedido = async (request, response) => {
  try {
    if (!request.body || Object.keys(request.body).length === 0) {
      return response.status(400).json({
        status: "BAD REQUEST",
        message: "Asegúrese de enviar todos los campos.",
      });
    }

    const repeatPedido = await Pedido.findOne({
      where: {
        numero_pedido: request.body.numero_pedido,
      },
    });

    if (repeatPedido) {
      return response.status(409).json({
        status: "pedido Conflict",
        message: "pedido already exist, pls use other pedido",
      });
    }

    const newPedido = await Pedido.create(request.body);
    return response.status(201).json({
      status: "success",
      data: newPedido,
    });
  } catch (error) {
    console.error("Error en createNewPedido:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getAllPedidos = async (request, response) => {
  try {
    const pedidos = await Pedido.findAll();

    return response.status(200).json({
      status: "success",
      data: pedidos,
    });
  } catch (error) {
    console.error("Error en getAllPedidos:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const deletePedido = async (request, response) => {
  const { id } = request.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return response.status(404).json({
        status: "Not Found",
        message: "Pedido not found",
      });
    }
    await pedido.destroy();
    return response.status(200).json({
      status: "success",
      message: "Pedido deleted successfully",
    });
  } catch (error) {
    console.error("Error en deletePedido:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const updatePedido = async (request, response) => {
  const { id } = request.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return response.status(404).json({
        status: "Not Found",
        message: "Pedido not found",
      });
    }
    await pedido.update(request.body);
    return response.status(200).json({
      status: "success",
      data: pedido,
    });
  } catch (error) {
    console.error("Error en updatePedido:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  createNewPedido,
  getAllPedidos,
  deletePedido,
  updatePedido,
};
