'use strict';
const crypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash passwords
    const hashedPassword = await crypt.hash('123456', 10);
    const hashedRepartidorPassword = await crypt.hash('abcdef', 10);

    await queryInterface.bulkInsert('Usuario', [
      // Administradores
      {
        nombre: 'Admin Uno',
        correo: 'admin1@mail.com',
        clave: hashedPassword,
        telefono: '99990001',
        rol: 'Administrador',
        estado: 'Activo',
        fecha_creacion: new Date()
      },
      {
        nombre: 'Admin Dos',
        correo: 'admin2@mail.com',
        clave: hashedPassword,
        telefono: '99990002',
        rol: 'Administrador',
        estado: 'Activo',
        fecha_creacion: new Date()
      },
      // Repartidores
      {
        nombre: 'Carlos Méndez',
        correo: 'carlos.mendez@mail.com',
        clave: hashedRepartidorPassword,
        telefono: '99990010',
        rol: 'Repartidor',
        estado: 'Activo',
        fecha_creacion: new Date()
      },
      {
        nombre: 'María González',
        correo: 'maria.gonzalez@mail.com',
        clave: hashedRepartidorPassword,
        telefono: '99990011',
        rol: 'Repartidor',
        estado: 'Activo',
        fecha_creacion: new Date()
      },
      {
        nombre: 'Juan Pérez',
        correo: 'juan.perez@mail.com',
        clave: hashedRepartidorPassword,
        telefono: '99990012',
        rol: 'Repartidor',
        estado: 'Activo',
        fecha_creacion: new Date()
      },
      {
        nombre: 'Ana Rodríguez',
        correo: 'ana.rodriguez@mail.com',
        clave: hashedRepartidorPassword,
        telefono: '99990013',
        rol: 'Repartidor',
        estado: 'Activo',
        fecha_creacion: new Date()
      },
      {
        nombre: 'Luis Martínez',
        correo: 'luis.martinez@mail.com',
        clave: hashedRepartidorPassword,
        telefono: '99990014',
        rol: 'Repartidor',
        estado: 'Inactivo',
        fecha_creacion: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuario', null, {});
  }
};
