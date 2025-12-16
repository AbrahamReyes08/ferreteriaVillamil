import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function InfoRepartidorCliente({ nombre, telefono }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <Avatar
        size={64}
        icon={<UserOutlined />}
        style={{ 
          backgroundColor: '#B2B6B5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold" style={{ color: '#163269' }}>
          {nombre || 'Nombre del Repartidor'}
        </h3>
        <p className="text-sm" style={{ color: '#666' }}>
          {telefono || 'Teléfono del Repartidor'}
        </p>
      </div>
    </div>
  );
}

export default InfoRepartidorCliente;
