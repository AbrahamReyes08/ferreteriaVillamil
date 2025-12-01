'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Detalle_Pedido', [
      // PED001 - Entregado (hace 2 meses) - Carlos Méndez
      {
        id_pedido: 1,
        id_articulo: 1, // Martillo
        cantidad: 2,
        precio_unitario: 80,
        subtotal: 160
      },
      {
        id_pedido: 1,
        id_articulo: 2, // Destornillador
        cantidad: 3,
        precio_unitario: 25,
        subtotal: 75
      },
      // PED002 - Entregado (hace 2 meses) - Carlos Méndez
      {
        id_pedido: 2,
        id_articulo: 3, // Clavos
        cantidad: 2,
        precio_unitario: 15,
        subtotal: 30
      },
      {
        id_pedido: 2,
        id_articulo: 4, // Pintura
        cantidad: 1,
        precio_unitario: 180,
        subtotal: 180
      },
      // PED003 - Entregado (hace 1 mes) - María González
      {
        id_pedido: 3,
        id_articulo: 5, // Cerradura
        cantidad: 1,
        precio_unitario: 350,
        subtotal: 350
      },
      {
        id_pedido: 3,
        id_articulo: 2, // Destornillador
        cantidad: 2,
        precio_unitario: 25,
        subtotal: 50
      },
      // PED004 - Entregado (hace 1 mes) - María González
      {
        id_pedido: 4,
        id_articulo: 7, // Broca
        cantidad: 2,
        precio_unitario: 75,
        subtotal: 150
      },
      {
        id_pedido: 4,
        id_articulo: 8, // Tubo PVC
        cantidad: 5,
        precio_unitario: 20,
        subtotal: 100
      },
      {
        id_pedido: 4,
        id_articulo: 1, // Martillo
        cantidad: 1,
        precio_unitario: 80,
        subtotal: 80
      },
      // PED005 - Entregado (hace 1 mes) - María González
      {
        id_pedido: 5,
        id_articulo: 3, // Clavos
        cantidad: 3,
        precio_unitario: 15,
        subtotal: 45
      },
      {
        id_pedido: 5,
        id_articulo: 2, // Destornillador
        cantidad: 2,
        precio_unitario: 25,
        subtotal: 50
      },
      {
        id_pedido: 5,
        id_articulo: 8, // Tubo PVC
        cantidad: 3,
        precio_unitario: 20,
        subtotal: 60
      },
      // PED006 - Entregado (hace 15 días) - Juan Pérez
      {
        id_pedido: 6,
        id_articulo: 6, // Cable Eléctrico
        cantidad: 1,
        precio_unitario: 130,
        subtotal: 130
      },
      {
        id_pedido: 6,
        id_articulo: 7, // Broca
        cantidad: 1,
        precio_unitario: 75,
        subtotal: 75
      },
      {
        id_pedido: 6,
        id_articulo: 2, // Destornillador
        cantidad: 2,
        precio_unitario: 25,
        subtotal: 50
      },
      // PED007 - Entregado (hace 15 días) - Juan Pérez
      {
        id_pedido: 7,
        id_articulo: 1, // Martillo
        cantidad: 1,
        precio_unitario: 80,
        subtotal: 80
      },
      {
        id_pedido: 7,
        id_articulo: 3, // Clavos
        cantidad: 2,
        precio_unitario: 15,
        subtotal: 30
      },
      {
        id_pedido: 7,
        id_articulo: 8, // Tubo PVC
        cantidad: 4,
        precio_unitario: 20,
        subtotal: 80
      },
      // PED008 - Entregado (hace 7 días) - Ana Rodríguez
      {
        id_pedido: 8,
        id_articulo: 10, // Bomba de Agua
        cantidad: 1,
        precio_unitario: 500,
        subtotal: 500
      },
      {
        id_pedido: 8,
        id_articulo: 8, // Tubo PVC
        cantidad: 3,
        precio_unitario: 20,
        subtotal: 60
      },
      // PED009 - Entregado (hace 7 días) - Ana Rodríguez
      {
        id_pedido: 9,
        id_articulo: 4, // Pintura
        cantidad: 1,
        precio_unitario: 180,
        subtotal: 180
      },
      {
        id_pedido: 9,
        id_articulo: 2, // Destornillador
        cantidad: 1,
        precio_unitario: 25,
        subtotal: 25
      },
      // PED010 - Entregado (hace 3 días) - Carlos Méndez
      {
        id_pedido: 10,
        id_articulo: 5, // Cerradura
        cantidad: 1,
        precio_unitario: 350,
        subtotal: 350
      },
      {
        id_pedido: 10,
        id_articulo: 7, // Broca
        cantidad: 1,
        precio_unitario: 75,
        subtotal: 75
      },
      // PED011 - Entregado (hace 3 días) - Carlos Méndez
      {
        id_pedido: 11,
        id_articulo: 1, // Martillo
        cantidad: 2,
        precio_unitario: 80,
        subtotal: 160
      },
      {
        id_pedido: 11,
        id_articulo: 2, // Destornillador
        cantidad: 2,
        precio_unitario: 25,
        subtotal: 50
      },
      {
        id_pedido: 11,
        id_articulo: 3, // Clavos
        cantidad: 1,
        precio_unitario: 15,
        subtotal: 15
      },
      // PED012 - Entregado (ayer) - María González
      {
        id_pedido: 12,
        id_articulo: 8, // Tubo PVC
        cantidad: 4,
        precio_unitario: 20,
        subtotal: 80
      },
      {
        id_pedido: 12,
        id_articulo: 2, // Destornillador
        cantidad: 3,
        precio_unitario: 25,
        subtotal: 75
      },
      {
        id_pedido: 12,
        id_articulo: 3, // Clavos
        cantidad: 2,
        precio_unitario: 15,
        subtotal: 30
      },
      // PED013 - Pendiente (no tiene detalles aún)
      // PED014 - Asignado
      {
        id_pedido: 14,
        id_articulo: 1, // Martillo
        cantidad: 1,
        precio_unitario: 80,
        subtotal: 80
      },
      {
        id_pedido: 14,
        id_articulo: 2, // Destornillador
        cantidad: 2,
        precio_unitario: 25,
        subtotal: 50
      },
      // PED015 - En transcurso
      {
        id_pedido: 15,
        id_articulo: 4, // Pintura
        cantidad: 1,
        precio_unitario: 180,
        subtotal: 180
      },
      {
        id_pedido: 15,
        id_articulo: 7, // Broca
        cantidad: 1,
        precio_unitario: 75,
        subtotal: 75
      },
      // PED016 - Cancelado
      {
        id_pedido: 16,
        id_articulo: 5, // Cerradura
        cantidad: 1,
        precio_unitario: 350,
        subtotal: 350
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detalle_Pedido', null, {});
  }
};
