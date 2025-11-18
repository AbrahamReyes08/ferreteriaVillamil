'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuario', [
      {
        nombre: 'Admin Uno',
        correo: 'admin1@mail.com',
        clave: '123456',
        telefono: '99990001',
        rol: 'Administrador',
        estado: 'Activo',
        fecha_creacion: new Date()
      },
      {
        nombre: 'Repartidor Uno',
        correo: 'repartidor1@mail.com',
        clave: 'abcdef',
        telefono: '99990002',
        rol: 'Repartidor',
        estado: 'Activo',
        fecha_creacion: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuario', null, {});
  }
};
