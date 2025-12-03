'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fechas fijas para facilitar las pruebas
    // Octubre 2024 (hace 2 meses desde diciembre)
    const fechaOctubre15 = new Date('2024-10-15T10:00:00');
    const fechaOctubre16 = new Date('2024-10-16T14:00:00');
    
    // Noviembre 2024 (hace 1 mes desde diciembre)
    const fechaNoviembre10 = new Date('2024-11-10T09:00:00');
    const fechaNoviembre12 = new Date('2024-11-12T11:00:00');
    const fechaNoviembre15 = new Date('2024-11-15T13:00:00');
    
    // Diciembre 2024 (últimas semanas)
    const fechaDiciembre01 = new Date('2024-12-01T08:00:00');
    const fechaDiciembre02 = new Date('2024-12-02T10:00:00');
    const fechaDiciembre09 = new Date('2024-12-09T09:00:00');
    const fechaDiciembre10 = new Date('2024-12-10T11:00:00');
    const fechaDiciembre13 = new Date('2024-12-13T14:00:00');
    const fechaDiciembre14 = new Date('2024-12-14T16:00:00');
    const fechaDiciembre15 = new Date('2024-12-15T10:00:00'); // Ayer relativo
    
    // Fechas para pedidos en otros estados (hoy)
    const fechaHoy = new Date('2024-12-16T10:00:00');

    await queryInterface.bulkInsert('Pedido', [
      // Pedidos Entregados (Octubre 2024) - Carlos Méndez
      {
        numero_pedido: 'PED001',
        cliente_nombre: 'Juan García',
        cliente_telefono: '88880001',
        cliente_identidad: '0801-1990-12345',
        id_repartidor_asignado: 3, // Carlos Méndez
        id_admin_creador: 1,
        estado: 'Entregado',
        codigo_confirmacion: '123456',
        costo_envio: 50,
        total: 280,
        direccion_entrega: 'Col. Centro, Tegucigalpa',
        observacion: 'Entregado sin problemas',
        fecha_creacion: fechaOctubre15,
        fecha_asignacion: new Date('2024-10-15T12:00:00'),
        fecha_entrega: new Date('2024-10-15T14:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      {
        numero_pedido: 'PED002',
        cliente_nombre: 'María López',
        cliente_telefono: '88880002',
        cliente_identidad: '0801-1985-67890',
        id_repartidor_asignado: 3, // Carlos Méndez
        id_admin_creador: 1,
        estado: 'Entregado',
        codigo_confirmacion: '234567',
        costo_envio: 30,
        total: 180,
        direccion_entrega: 'Col. Las Flores, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaOctubre16,
        fecha_asignacion: new Date('2024-10-16T16:00:00'),
        fecha_entrega: new Date('2024-10-16T18:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // Pedidos Entregados (Noviembre 2024) - María González
      {
        numero_pedido: 'PED003',
        cliente_nombre: 'Pedro Hernández',
        cliente_telefono: '88880003',
        cliente_identidad: '0801-1992-11111',
        id_repartidor_asignado: 4, // María González
        id_admin_creador: 1,
        estado: 'Entregado',
        codigo_confirmacion: '345678',
        costo_envio: 40,
        total: 220,
        direccion_entrega: 'Col. El Hatillo, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaNoviembre10,
        fecha_asignacion: new Date('2024-11-10T10:00:00'),
        fecha_entrega: new Date('2024-11-10T12:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      {
        numero_pedido: 'PED004',
        cliente_nombre: 'Ana Martínez',
        cliente_telefono: '88880004',
        cliente_identidad: '0801-1988-22222',
        id_repartidor_asignado: 4, // María González
        id_admin_creador: 2,
        estado: 'Entregado',
        codigo_confirmacion: '456789',
        costo_envio: 50,
        total: 350,
        direccion_entrega: 'Col. Miraflores, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaNoviembre12,
        fecha_asignacion: new Date('2024-11-12T13:00:00'),
        fecha_entrega: new Date('2024-11-12T16:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      {
        numero_pedido: 'PED005',
        cliente_nombre: 'Luis Ramírez',
        cliente_telefono: '88880005',
        cliente_identidad: '0801-1995-33333',
        id_repartidor_asignado: 4, // María González
        id_admin_creador: 1,
        estado: 'Entregado',
        codigo_confirmacion: '567890',
        costo_envio: 35,
        total: 155,
        direccion_entrega: 'Col. Los Pinos, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaNoviembre15,
        fecha_asignacion: new Date('2024-11-15T14:00:00'),
        fecha_entrega: new Date('2024-11-15T17:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // Pedidos Entregados (Diciembre 2024 - hace 15 días) - Juan Pérez
      {
        numero_pedido: 'PED006',
        cliente_nombre: 'Carmen Díaz',
        cliente_telefono: '88880006',
        cliente_identidad: '0801-1991-44444',
        id_repartidor_asignado: 5, // Juan Pérez
        id_admin_creador: 2,
        estado: 'Entregado',
        codigo_confirmacion: '678901',
        costo_envio: 45,
        total: 275,
        direccion_entrega: 'Col. La Esperanza, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaDiciembre01,
        fecha_asignacion: new Date('2024-12-01T10:00:00'),
        fecha_entrega: new Date('2024-12-01T13:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      {
        numero_pedido: 'PED007',
        cliente_nombre: 'Roberto Sánchez',
        cliente_telefono: '88880007',
        cliente_identidad: '0801-1987-55555',
        id_repartidor_asignado: 5, // Juan Pérez
        id_admin_creador: 1,
        estado: 'Entregado',
        codigo_confirmacion: '789012',
        costo_envio: 40,
        total: 190,
        direccion_entrega: 'Col. San Miguel, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaDiciembre02,
        fecha_asignacion: new Date('2024-12-02T11:00:00'),
        fecha_entrega: new Date('2024-12-02T14:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // Pedidos Entregados (Diciembre 2024 - hace 7 días) - Ana Rodríguez
      {
        numero_pedido: 'PED008',
        cliente_nombre: 'Sofía Morales',
        cliente_telefono: '88880008',
        cliente_identidad: '0801-1993-66666',
        id_repartidor_asignado: 6, // Ana Rodríguez
        id_admin_creador: 2,
        estado: 'Entregado',
        codigo_confirmacion: '890123',
        costo_envio: 50,
        total: 430,
        direccion_entrega: 'Col. Villa Nueva, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaDiciembre09,
        fecha_asignacion: new Date('2024-12-09T10:00:00'),
        fecha_entrega: new Date('2024-12-09T13:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      {
        numero_pedido: 'PED009',
        cliente_nombre: 'Diego Castro',
        cliente_telefono: '88880009',
        cliente_identidad: '0801-1994-77777',
        id_repartidor_asignado: 6, // Ana Rodríguez
        id_admin_creador: 1,
        estado: 'Entregado',
        codigo_confirmacion: '901234',
        costo_envio: 30,
        total: 170,
        direccion_entrega: 'Col. La Granja, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaDiciembre10,
        fecha_asignacion: new Date('2024-12-10T12:00:00'),
        fecha_entrega: new Date('2024-12-10T15:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // Pedidos Entregados (Diciembre 2024 - hace 3 días) - Carlos Méndez
      {
        numero_pedido: 'PED010',
        cliente_nombre: 'Laura Jiménez',
        cliente_telefono: '88880010',
        cliente_identidad: '0801-1996-88888',
        id_repartidor_asignado: 3, // Carlos Méndez
        id_admin_creador: 1,
        estado: 'Entregado',
        codigo_confirmacion: '012345',
        costo_envio: 45,
        total: 295,
        direccion_entrega: 'Col. El Pedregal, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaDiciembre13,
        fecha_asignacion: new Date('2024-12-13T15:00:00'),
        fecha_entrega: new Date('2024-12-13T17:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      {
        numero_pedido: 'PED011',
        cliente_nombre: 'Fernando Torres',
        cliente_telefono: '88880011',
        cliente_identidad: '0801-1989-99999',
        id_repartidor_asignado: 3, // Carlos Méndez
        id_admin_creador: 2,
        estado: 'Entregado',
        codigo_confirmacion: '123450',
        costo_envio: 40,
        total: 240,
        direccion_entrega: 'Col. La Reforma, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaDiciembre14,
        fecha_asignacion: new Date('2024-12-14T17:00:00'),
        fecha_entrega: new Date('2024-12-14T19:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // Pedidos Entregados (Diciembre 2024 - ayer) - María González
      {
        numero_pedido: 'PED012',
        cliente_nombre: 'Patricia Vega',
        cliente_telefono: '88880012',
        cliente_identidad: '0801-1997-00000',
        id_repartidor_asignado: 4, // María González
        id_admin_creador: 1,
        estado: 'Entregado',
        codigo_confirmacion: '234561',
        costo_envio: 35,
        total: 185,
        direccion_entrega: 'Col. La Kennedy, Tegucigalpa',
        observacion: null,
        fecha_creacion: fechaDiciembre15,
        fecha_asignacion: new Date('2024-12-15T12:00:00'),
        fecha_entrega: new Date('2024-12-15T15:00:00'),
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // Pedidos en otros estados - Demostrando múltiples pedidos activos por repartidor
      {
        numero_pedido: 'PED013',
        cliente_nombre: 'Miguel Ángel',
        cliente_telefono: '88880013',
        cliente_identidad: '0801-1990-11111',
        id_repartidor_asignado: null,
        id_admin_creador: 1,
        estado: 'Pendiente',
        codigo_confirmacion: null,
        costo_envio: 50,
        total: 300,
        direccion_entrega: 'Col. Nueva Capital, Tegucigalpa',
        observacion: null,
        fecha_creacion: new Date('2024-12-16T08:00:00'),
        fecha_asignacion: null,
        fecha_entrega: null,
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // Juan Pérez (ID 5) tiene múltiples pedidos asignados
      {
        numero_pedido: 'PED014',
        cliente_nombre: 'Elena Ruiz',
        cliente_telefono: '88880014',
        cliente_identidad: '0801-1991-22222',
        id_repartidor_asignado: 5, // Juan Pérez - Primer pedido activo
        id_admin_creador: 2,
        estado: 'Asignado',
        codigo_confirmacion: null,
        costo_envio: 40,
        total: 220,
        direccion_entrega: 'Col. La Montañita, Tegucigalpa',
        observacion: null,
        fecha_creacion: new Date('2024-12-16T05:00:00'),
        fecha_asignacion: new Date('2024-12-16T06:00:00'),
        fecha_entrega: null,
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // Ana Rodríguez (ID 6) tiene múltiples pedidos asignados
      {
        numero_pedido: 'PED015',
        cliente_nombre: 'Ricardo Mejía',
        cliente_telefono: '88880015',
        cliente_identidad: '0801-1992-33333',
        id_repartidor_asignado: 6, // Ana Rodríguez - Primer pedido activo
        id_admin_creador: 1,
        estado: 'En transcurso',
        codigo_confirmacion: '345678',
        costo_envio: 45,
        total: 275,
        direccion_entrega: 'Col. Suyapa, Tegucigalpa',
        observacion: null,
        fecha_creacion: new Date('2024-12-16T07:00:00'),
        fecha_asignacion: new Date('2024-12-16T08:00:00'),
        fecha_entrega: null,
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // María González (ID 4) tiene múltiples pedidos asignados
      {
        numero_pedido: 'PED016',
        cliente_nombre: 'Gabriela Fuentes',
        cliente_telefono: '88880016',
        cliente_identidad: '0801-1993-44444',
        id_repartidor_asignado: 4, // María González - Pedido cancelado
        id_admin_creador: 2,
        estado: 'Cancelado',
        codigo_confirmacion: null,
        costo_envio: 50,
        total: 350,
        direccion_entrega: 'Col. La Leona, Tegucigalpa',
        observacion: null,
        fecha_creacion: new Date('2024-12-06T10:00:00'),
        fecha_asignacion: new Date('2024-12-07T10:00:00'),
        fecha_entrega: null,
        fecha_cancelacion: new Date('2024-12-08T10:00:00'),
        motivo_cancelacion: 'Cliente canceló el pedido',
        link_seguimiento: null
      },
      // Juan Pérez (ID 5) - Segundo pedido activo (demostrando múltiples pedidos)
      {
        numero_pedido: 'PED017',
        cliente_nombre: 'Carlos Herrera',
        cliente_telefono: '88880017',
        cliente_identidad: '0801-1988-55555',
        id_repartidor_asignado: 5, // Juan Pérez - Segundo pedido activo
        id_admin_creador: 1,
        estado: 'Asignado',
        codigo_confirmacion: null,
        costo_envio: 35,
        total: 195,
        direccion_entrega: 'Col. Boulevard, Tegucigalpa',
        observacion: 'Cliente solicita entrega urgente',
        fecha_creacion: new Date('2024-12-16T09:00:00'),
        fecha_asignacion: new Date('2024-12-16T09:30:00'),
        fecha_entrega: null,
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      },
      // Ana Rodríguez (ID 6) - Segundo pedido activo (demostrando múltiples pedidos)
      {
        numero_pedido: 'PED018',
        cliente_nombre: 'Sandra Morales',
        cliente_telefono: '88880018',
        cliente_identidad: '0801-1995-66666',
        id_repartidor_asignado: 6, // Ana Rodríguez - Segundo pedido activo
        id_admin_creador: 2,
        estado: 'Asignado',
        codigo_confirmacion: null,
        costo_envio: 40,
        total: 260,
        direccion_entrega: 'Col. Kennedy, Tegucigalpa',
        observacion: null,
        fecha_creacion: new Date('2024-12-16T10:00:00'),
        fecha_asignacion: new Date('2024-12-16T10:30:00'),
        fecha_entrega: null,
        fecha_cancelacion: null,
        motivo_cancelacion: null,
        link_seguimiento: null
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pedido', null, {});
  }
};
