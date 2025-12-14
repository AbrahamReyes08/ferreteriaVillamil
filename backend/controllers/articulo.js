const {Articulo} = require('../models');
const { Op, Sequelize } = require("sequelize");

function checkForNull(data, res){
    if (!data || Object.keys(data).length === 0) {
        res.status(400).json({
            status: "Error",
            message: "Request body cannot be empty"
        });
        return false;
    };
        if (!data.codigo) {
        res.status(422).json({
            status: "Error",
            message: "Field 'codigo' is required"
        });
        return false;
    }
    return true;
}

const nuevoArticulo = async (request, response) => {
    try {
        const data = request.body;
        if (!checkForNull(data, response)) return;

        const check = await Articulo.findOne({
            where: { codigo: data.codigo }
        });
        if(!check){
            const newArticulo = await Articulo.create(data);
            return response.status(201).json({
                status: "Success",
                message: "Creado articulo con éxito",
                data: newArticulo
            });
        } else {
            return response.status(409).json({
                status: "Non-unique Code",
                message: "Unique code already exists, please try another code"
            });
        }
    } catch (error) {
        return response.status(500).json({
                status: "Error",
                message: error.message
            });
    }
}

const editArticulo = async (request, response) => {
    try{
        const data = request.body;
        if (!data || Object.keys(data).length === 0) {
            res.status(400).json({
                status: "Error",
                message: "Request body cannot be empty"
            });
            return false;
        };

        const articulo = await Articulo.findOne({
            where : { codigo: request.params.codigo }
        });

        if (articulo){
            await articulo.update(data)
            return response.status(200).json({
                status: "Success",
                message: "Item updated successfully",
                data: articulo
            });
        } else {
            return response.status(404).json({
                status: "Not Found",
                message: "Requested code does not exist"
            });
        };

    } catch(error) {
        response.status(500).json({
                status: "Error",
                message: error.message
            });
    }
}

const lowStockItems = async (request, response) => {
    try{
        const items = await Articulo.findAll({
            where: { cantidad_existencia: { 
                [Op.lte]: Sequelize.col('stock_minimo') 
            } }
        })

        return response.status(200).json({
            status: "Success",
            data: items
        });

    } catch (error) {
        response.status(500).json({
                status: "Error",
                message: error.message
            });
    }
}

const getAllItems = async (request, response) => {
    try {
        const items = await Articulo.findAll({
        order: [
            ['id_articulo', 'ASC'] 
        ]});

        return response.status(200).json({
            status: "Success",
            data: items
        });
    } catch (error) {
        return response.status(500).json({
            status:"Error",
            message: error.message
        })
    }
}

const getAllActiveItems = async (request, response) => {
    try {
        const items = await Articulo.findAll({
            where: {estado: "Disponible"}
        });

        return response.status(200).json({
            status: "Success",
            data: items
        });
    } catch (error) {
        return response.status(500).json({
            status:"Error",
            message: error.message
        })
    }
}

const getItemByID = async (request, response) => {
    try {
        const data = request.params.codigo;

        const item = await Articulo.findOne({
            where: { codigo: data}
        });
        
        if(!item){
            return response.status(404).json({
                status: "Not Found",
                message: "Requested code does not exist"
            });
        }
        return response.status(200).json({
            status: "Success",
            data: item
        });

    } catch (error) {
        return response.status(500).json({
            status:"Error",
            message: error.message
        })
    }
}

const deleteItem = async (request, response) => {
    try {
        const data = request.params.codigo;

        const item = await Articulo.findOne({
            where: { codigo: data}
        });

        if(!item){
            return response.status(404).json({
                status: "Not Found",
                message: "Requested code does not exist"
            });
        }

        await item.destroy();

        return response.status(200).json({
            status: "Success",
            message: "Item deleted successfully"
        });

    } catch (error) {
        return response.status(500).json({
            status:"Error",
            message: error.message
        })
    }
}

module.exports = {
    nuevoArticulo,
    editArticulo,
    lowStockItems,
    getAllItems,
    getItemByID,
    deleteItem,
    getAllActiveItems,

}