const { Pedido, Usuario } = require("../models");

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

const asignarRepartidor = async (request, response) => {
  const { id } = request.params;
  const { id_repartidor } = request.body;
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return response.status(404).json({
        status: "Not Found",
        message: "Pedido not found",
      });
    }
    await pedido.update({ id_repartidor_asignado: id_repartidor });
    await pedido.update({ estado: "Asignado" });
    await pedido.update({ fecha_asignacion: new Date() });
    
    return response.status(200).json({
      status: "success",
      message: "Repartidor asignado correctamente",
    });
  } catch (error) {
    console.error("Error en asignarRepartidor:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const generarCodigo = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const mandarCodigoEntregado = async (request, response) => {
  const { id } = request.params;

  try {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return response.status(404).json({
        status: "Not Found",
        message: "Pedido not found",
      });
    }

    const codigo = generarCodigo();

    await pedido.update({
      codigo_confirmacion: codigo,
      estado: "En transcurso",
    });

    return response.status(200).json({
      status: "success",
      message: "Código generado correctamente",
      codigo: codigo,
    });
  } catch (error) {
    console.error("Error en mandarCodigoEntregado:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const validarCodigoEntregado = async (request, response) => {
  const { id, codigo } = request.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return response
        .status(404)
        .json({ status: "Not Found", message: "Pedido not found" });
    }
    if (pedido.codigo_confirmacion !== codigo) {
      return response.status(400).json({
        status: "Bad Request",
        message: "Código de confirmación incorrecto",
      });
    }
    await pedido.update({ estado: "Entregado" });
    return response
      .status(200)
      .json({ status: "success", message: "Pedido marcado como entregado" });
  } catch (error) {
    console.error("Error en validarCodigoEntregado:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getPedidosByRepartidor = async (request, response) => {
  const { id_repartidor } = request.params;
  try {
    const pedidos = await Pedido.findAll({
      where: { id_repartidor_asignado: id_repartidor }
    });

    return response.status(200).json({
      status: "success",
      data: pedidos,
      count: pedidos.length
    });
  } catch (error) {
    console.error("Error en getPedidosByRepartidor:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getPedidosActivosByRepartidor = async (request, response) => {
  const { id_repartidor } = request.params;
  try {
    const pedidos = await Pedido.findAll({
      where: { 
        id_repartidor_asignado: id_repartidor,
        estado: ['Asignado', 'En transcurso']
      }
    });

    return response.status(200).json({
      status: "success",
      data: pedidos,
      count: pedidos.length
    });
  } catch (error) {
    console.error("Error en getPedidosActivosByRepartidor:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getPedidoById = async (request, response) => {
  const { id } = request.params;
  try {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return response.status(404).json({
        status: "Not Found",
        message: "Pedido not found",
      });
    }

    return response.status(200).json({
      status: "success",
      data: pedido,
    });
  } catch (error) {
    console.error("Error en getPedidoById:", error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  };
};

const cancelarEnvio = async (request, response) => {
  const { id } = request.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return response.status(404).json({
        status: "Not Found",
        message: "Pedido not found",
      });
    }
    await pedido.update({ estado: "Cancelado" });
    return response.status(200).json({
      status: "success",
      message: "Pedido cancelado correctamente",
    });
  } catch (error) {
    console.error("Error en cancelarEnvio:", error);
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
  getPedidoById,
  deletePedido,
  updatePedido,
  mandarCodigoEntregado,
  validarCodigoEntregado,
  getPedidosByRepartidor,
  getPedidosActivosByRepartidor,
  asignarRepartidor,
  cancelarEnvio
};
