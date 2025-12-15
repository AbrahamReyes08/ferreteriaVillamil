import React, { useState, useEffect } from 'react';
import { Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
        
function PerfilAdmin() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clave, setclave] = useState('');
  const [rol, setRol] = useState('Repartidor');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  const handleGetUserInfo = async () => {
    setLoading(true);

    
    try {
    const usuarioStorage = sessionStorage.getItem("usuario");
      if (!usuarioStorage) {
        throw new Error("No hay sesión activa");
      }
      const usuario = JSON.parse(usuarioStorage);
      const repartidorId = usuario.id_usuario;

      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api'}/usuarios/usuarios/${repartidorId}`);
      
      setNombre(response.data.nombre);
      setCorreo(response.data.correo);    
      setTelefono(response.data.telefono);
      setclave(''); // Por seguridad
      setRol(response.data.rol);
    } catch (err) {
      message.error('Error al obtener información del usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
        const usuarioStorage = sessionStorage.getItem("usuario");
      if (!usuarioStorage) {
        throw new Error("No hay sesión activa");
      }
      const usuario = JSON.parse(usuarioStorage);
      const repartidorId = usuario.id_usuario;

      
      const updateData = {
        nombre,
        correo,
        telefono,
        rol
      };
      
      if (clave) {
        updateData.clave = clave;
      }

      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api'}/usuarios/usuarios/${repartidorId}`, updateData);
      
      message.success('Usuario actualizado exitosamente');
      setIsEditing(false);
      setclave('');
      
      handleGetUserInfo();
    } catch (err) {
      message.error('Error al actualizar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setclave('');
    handleGetUserInfo();
  };

  return (
    <div className="w-full p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-5 pb-4 border-b-4" style={{ color: '#163269', borderColor: '#163269' }}>
            Perfil Repartidor
        </h1>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-10">
          <div className="flex flex-col gap-5 items-center md:items-start">
            <Avatar 
              size={{ xs: 80, sm: 100, md: 120, lg: 180 }}
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#B2B6B5' }}
              className="flex items-center justify-center"
            />
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                disabled={loading}
                className="font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                style={{ 
                  backgroundColor: '#163269',
                  color: 'white'
                }}
              >
                Editar
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                  style={{ 
                    backgroundColor: '#163269',
                    color: 'white'
                  }}
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={loading}
                  className="font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                  style={{ 
                    backgroundColor: '#BC7D3B',
                    color: 'white'
                  }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Forms */}
          <div className="flex-1 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                  Nombre:
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingresa el nombre"
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                  placeholder={isEditing ? "Ingresa nueva contraseña (opcional)" : "••••••••"}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-5 sm:max-w-[48%]">
              <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                Rol:
              </label>
              <input
                type="text"
                value={rol}
                disabled
                className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg opacity-60 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilAdmin;