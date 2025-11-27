const { Usuario: usuarioModel } = require("../models");
const crypt = require("bcrypt");
module.exports = {
  //Create
  createUsuario: async (req, res) => {
    try {
      const { nombre, correo, clave, telefono, rol } = req.body;

      if (!nombre || !correo || !clave || !telefono || !rol) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
      }

      if (await usuarioModel.findOne({ where: { correo } })) {
        return res
          .status(409)
          .json({ message: "El correo ya está registrado" });
      }
      const pw = await crypt.hash(clave, 10);

      const newUsuario = await usuarioModel.create({
        nombre,
        correo,
        clave: pw,
        telefono,
        rol,
      });

      res
        .status(201)
        .json({ message: "Usuario creado exitosamente", usuario: newUsuario });
    } catch (error) {
      res.status(500).json({ error, message: "Error interno creando usuario" });
    }
  },

  //Update
  updateUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, correo, clave, telefono, rol, estado } = req.body;
      const usuario = await usuarioModel.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      if (clave) {
        usuario.clave = (await crypt.hash(clave, 10)) || usuario.clave;
      }
      usuario.nombre = nombre || usuario.nombre;
      usuario.correo = correo || usuario.correo;
      usuario.telefono = telefono || usuario.telefono;
      usuario.rol = rol || usuario.rol;
      usuario.estado = estado || usuario.estado;
      await usuario.save();
      res
        .status(200)
        .json({ message: "Usuario actualizado exitosamente", usuario });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Error interno actualizando usuario" });
    }
  },

  //Read
  getUsuario: async (req, res) => {
    try {
      const usuarios = await usuarioModel.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Error interno obteniendo usuarios" });
    }
  },

  getUsuarioById: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await usuarioModel.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Error interno obteniendo usuario" });
    }
  },

  //Delete
  softDeleteUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await usuarioModel.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      usuario.estado = "Inactivo";
      await usuario.save();
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Error interno eliminando usuario" });
    }
  },

  deleteUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await usuarioModel.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      await usuario.destroy();
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Error interno eliminando usuario" });
    }
  },

  inicioSesionUsuario: async (req, res) => {
    try {
      const { correo, clave } = req.params;
      const usuario = await usuarioModel.findOne({ where: { correo } });
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      if (usuario.clave !== clave) {
        return res.status(401).json({ message: "Clave incorrecta" });
      }

      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Error interno en inicio de sesión" });
    }
  },
};
