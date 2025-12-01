'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articulo', [
      {
        codigo: 'MART001',
        nombre: 'Martillo de Acero',
        descripcion: 'Martillo profesional de acero inoxidable',
        costo_unitario: 50,
        precio: 80,
        cantidad_existencia: 100,
        stock_minimo: 10,
        proveedor: 'Herramientas Pro',
        estado: 'Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'DEST002',
        nombre: 'Destornillador Phillips',
        descripcion: 'Destornillador Phillips #2 de 6 pulgadas',
        costo_unitario: 15,
        precio: 25,
        cantidad_existencia: 200,
        stock_minimo: 20,
        proveedor: 'Herramientas Pro',
        estado: 'Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'CLAV003',
        nombre: 'Clavos de 2 pulgadas',
        descripcion: 'Caja de clavos de 2 pulgadas (1kg)',
        costo_unitario: 8,
        precio: 15,
        cantidad_existencia: 5, // Stock bajo
        stock_minimo: 10,
        proveedor: 'Ferretería Central',
        estado: 'Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'PINT004',
        nombre: 'Pintura Blanca',
        descripcion: 'Galón de pintura blanca látex',
        costo_unitario: 120,
        precio: 180,
        cantidad_existencia: 8, // Stock bajo
        stock_minimo: 15,
        proveedor: 'Pinturas Premium',
        estado: 'Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'CERR005',
        nombre: 'Cerradura de Seguridad',
        descripcion: 'Cerradura de seguridad con llave',
        costo_unitario: 200,
        precio: 350,
        cantidad_existencia: 50,
        stock_minimo: 5,
        proveedor: 'Seguridad Total',
        estado: 'Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'CABL006',
        nombre: 'Cable Eléctrico 12 AWG',
        descripcion: 'Rollo de cable eléctrico 12 AWG (100m)',
        costo_unitario: 80,
        precio: 130,
        cantidad_existencia: 3, // Stock muy bajo
        stock_minimo: 5,
        proveedor: 'Eléctrica Nacional',
        estado: 'Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'BROC007',
        nombre: 'Broca para Concreto',
        descripcion: 'Juego de brocas para concreto (5 piezas)',
        costo_unitario: 45,
        precio: 75,
        cantidad_existencia: 25,
        stock_minimo: 10,
        proveedor: 'Herramientas Pro',
        estado: 'Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'TUBO008',
        nombre: 'Tubo PVC 1/2 pulgada',
        descripcion: 'Tubo PVC de 1/2 pulgada (3 metros)',
        costo_unitario: 12,
        precio: 20,
        cantidad_existencia: 150,
        stock_minimo: 30,
        proveedor: 'Plomería Express',
        estado: 'Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'LAMP009',
        nombre: 'Lámpara LED',
        descripcion: 'Lámpara LED de 15W',
        costo_unitario: 25,
        precio: 40,
        cantidad_existencia: 0, // Sin stock
        stock_minimo: 5,
        proveedor: 'Iluminación Moderna',
        estado: 'No Disponible',
        fecha_creacion: new Date()
      },
      {
        codigo: 'BOMB010',
        nombre: 'Bomba de Agua',
        descripcion: 'Bomba de agua sumergible 1/2 HP',
        costo_unitario: 300,
        precio: 500,
        cantidad_existencia: 12,
        stock_minimo: 3,
        proveedor: 'Equipos Industriales',
        estado: 'Disponible',
        fecha_creacion: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articulo', null, {});
  }
};
