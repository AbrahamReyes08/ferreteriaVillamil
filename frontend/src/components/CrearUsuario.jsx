import React, { useState } from 'react';
import { Input, Select, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

function CrearUsuario() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clave, setclave] = useState('');
  const [rol, setRol] = useState('Repartidor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api'}/usuarios/usuarios`, {
        nombre,
        correo,
        clave,
        telefono,
        rol
      });
      
      console.log(response.data);
      message.success('Usuario registrado exitosamente');
      
      setNombre('');
      setCorreo('');
      setTelefono('');
      setclave('');
      setRol('Repartidor');
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al registrar usuario';
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-5 pb-4 border-b-4" style={{ color: '#163269', borderColor: '#163269' }}>
          Registrar Usuario
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-10 mt-10">
          {/* PP */}
          <div className="flex flex-col gap-5">
            <Avatar 
              size={180} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#B2B6B5' }}
              className="flex items-center justify-center"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: '#163269',
                color: 'white'
              }}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>

          {/* Forms */}
          <div className="flex-1 max-w-3xl">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                  Nombre:
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingresa el nombre"
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                  style={{ focusBorderColor: '#163269' }}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                  Correo:
                </label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="Ingresa el correo"
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el correo')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                  Telefono:
                </label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ingresa el teléfono"
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el teléfono')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                  Contraseña:
                </label>
                <input
                  type="password"
                  value={clave}
                  onChange={(e) => setclave(e.target.value)}
                  placeholder="Ingresa la contraseña"
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa la contraseña')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </div>
            </div>

            <div className="mt-5" style={{ maxWidth: '48%' }}>
              <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                Rol:
              </label>
              <Select 
                value={rol}
                onChange={(value) => setRol(value)}
                className="w-full"
                size="large"
              >
                <Option value="Repartidor">Repartidor</Option>
                <Option value="Administrador">Administrador</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;