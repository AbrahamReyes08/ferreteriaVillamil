'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fechas fijas que coinciden con los pedidos

    await queryInterface.bulkInsert('Calificacion', [
      // Calificaciones para PED001 (Carlos Méndez) - Octubre 2024
      {
        id_pedido: 1,
        puntuacion: 5,
        comentario: 'Excelente servicio, muy puntual y amable',
        fecha_calificacion: new Date('2024-10-15T15:00:00')
      },
      // Calificaciones para PED002 (Carlos Méndez) - Octubre 2024
      {
        id_pedido: 2,
        puntuacion: 4,
        comentario: 'Buen servicio, todo en orden',
        fecha_calificacion: new Date('2024-10-16T19:00:00')
      },
      // Calificaciones para PED003 (María González) - Noviembre 2024
      {
        id_pedido: 3,
        puntuacion: 5,
        comentario: 'Muy profesional, entregó rápido',
        fecha_calificacion: new Date('2024-11-10T13:00:00')
      },
      // Calificaciones para PED004 (María González) - Noviembre 2024
      {
        id_pedido: 4,
        puntuacion: 5,
        comentario: 'Perfecto, todo llegó bien',
        fecha_calificacion: new Date('2024-11-12T17:00:00')
      },
      // Calificaciones para PED005 (María González) - Noviembre 2024
      {
        id_pedido: 5,
        puntuacion: 4,
        comentario: 'Buen servicio',
        fecha_calificacion: new Date('2024-11-15T18:00:00')
      },
      // Calificaciones para PED006 (Juan Pérez) - Diciembre 2024
      {
        id_pedido: 6,
        puntuacion: 3,
        comentario: 'Llegó un poco tarde pero todo bien',
        fecha_calificacion: new Date('2024-12-01T14:00:00')
      },
      // Calificaciones para PED007 (Juan Pérez) - Diciembre 2024
      {
        id_pedido: 7,
        puntuacion: 4,
        comentario: 'Buen trabajo',
        fecha_calificacion: new Date('2024-12-02T15:00:00')
      },
      // Calificaciones para PED008 (Ana Rodríguez) - Diciembre 2024
      {
        id_pedido: 8,
        puntuacion: 5,
        comentario: 'Excelente atención, muy recomendable',
        fecha_calificacion: new Date('2024-12-09T14:00:00')
      },
      // Calificaciones para PED009 (Ana Rodríguez) - Diciembre 2024
      {
        id_pedido: 9,
        puntuacion: 5,
        comentario: 'Muy satisfecho con el servicio',
        fecha_calificacion: new Date('2024-12-10T16:00:00')
      },
      // Calificaciones para PED010 (Carlos Méndez) - Diciembre 2024
      {
        id_pedido: 10,
        puntuacion: 5,
        comentario: 'Perfecto, muy rápido',
        fecha_calificacion: new Date('2024-12-13T18:00:00')
      },
      // Calificaciones para PED011 (Carlos Méndez) - Diciembre 2024
      {
        id_pedido: 11,
        puntuacion: 4,
        comentario: 'Todo correcto',
        fecha_calificacion: new Date('2024-12-14T20:00:00')
      },
      // Calificaciones para PED012 (María González) - Diciembre 2024
      {
        id_pedido: 12,
        puntuacion: 5,
        comentario: 'Excelente servicio, muy amable',
        fecha_calificacion: new Date('2024-12-15T16:00:00')
      }
      // Nota: No todos los pedidos entregados tienen calificaciones
      // Esto permite probar que el sistema maneja correctamente los NULL
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Calificacion', null, {});
  }
};
