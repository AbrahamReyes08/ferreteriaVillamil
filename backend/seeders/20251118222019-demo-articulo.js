'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articulo', [
      {
        codigo: 'ART001',
        nombre: 'Producto A',
        descripcion: 'Descripción del producto A',
        costo_unitario: 50,
        precio: 80,
        cantidad_existencia: 100,
        stock_minimo: 10,
        proveedor: 'Proveedor X',
        estado: 'Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'ART002',
        nombre: 'Producto B',
        descripcion: 'Descripción del producto B',
        costo_unitario: 30,
        precio: 50,
        cantidad_existencia: 200,
        stock_minimo: 20,
        proveedor: 'Proveedor Y',
        estado: 'Disponible',
        fecha_creacion: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articulo', null, {});
  }
};
