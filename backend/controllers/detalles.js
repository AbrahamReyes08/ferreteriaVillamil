const {Detalle_Pedido} = require('../models');

function checkForNull(data, res){
    if (!data || Object.keys(data).length === 0) {
        res.status(400).json({
            status: "Error",
            message: "Request body cannot be empty"
        });
        return false;
    };
        if (!data.id_pedido) {
        res.status(422).json({
            status: "Error",
            message: "Field 'id_pedido' is required"
        });
        return false;
    }
    return true;
}

const nuevoDetalle = async (request, response) => {
    try {
        const data = request.body;
        if (!checkForNull(data, response)) return;

        const newDetalle = await Detalle_Pedido.create(data);
        return response.status(201).json({
            status: "Success",
            message: "Detalles del pedido creado con éxito",
            data: newDetalle
        });
    } catch (error) {
        return response.status(500).json({
                status: "Error",
                message: error.message
            });
    }
}

module.exports = {
    nuevoDetalle
};