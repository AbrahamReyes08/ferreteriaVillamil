import React, { useState, useEffect } from "react";
import { FaHome, FaWarehouse, FaUsers, FaBox, FaTruck, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/LogoFerreteriaVillamil.png";

// Configurar axios para enviar token en todas las peticiones
axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function SidebarAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const usuarioData = sessionStorage.getItem('usuario');
    if (usuarioData) {
      setUserData(JSON.parse(usuarioData));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-72 bg-white h-screen flex flex-col border-r shadow-lg">
      <div className="p-6 border-b border-[#E6E6E6]">
        <div className="flex items-center justify-center gap-2">
          <img
            src={logo}
            alt="Ferretería Villamil Logo"
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>

      {/*Menu */}
      <nav className="flex-1 py-8">
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-6 py-4 mb-2 hover:bg-gray-50 transition-colors cursor-pointer ${
            isActive('/dashboard') ? 'text-[#BC7D3B]' : 'text-[#163269]'
          }`}
        >
          <FaHome className="w-6 h-6" />
          <span className={`text-lg font-semibold ${!isActive('/dashboard') && 'underline'}`}>
            Dashboard
          </span>
        </Link>

        <Link 
          to="/inventario" 
          className={`flex items-center gap-3 px-6 py-4 mb-2 hover:bg-gray-50 transition-colors cursor-pointer ${
            isActive('/inventario') ? 'text-[#BC7D3B]' : 'text-[#163269]'
          }`}
        >
          <FaWarehouse className="w-6 h-6" />
          <span className={`text-lg font-semibold ${!isActive('/inventario') && 'underline'}`}>
            Inventario
          </span>
        </Link>

        <Link 
          to="/admin/usuarios" 
          className={`flex items-center gap-3 px-6 py-4 mb-2 hover:bg-gray-50 transition-colors cursor-pointer ${
            isActive('/admin/usuarios') ? 'text-[#BC7D3B]' : 'text-[#163269]'
          }`}
        >
          <FaUsers className="w-6 h-6" />
          <span className={`text-lg font-semibold ${!isActive('/usuarios') && 'underline'}`}>
            Usuarios
          </span>
        </Link>

        <Link 
          to="/pedidos" 
          className={`flex items-center gap-3 px-6 py-4 mb-2 hover:bg-gray-50 transition-colors cursor-pointer ${
            isActive('/pedidos') ? 'text-[#BC7D3B]' : 'text-[#163269]'
          }`}
        >
          <FaBox className="w-6 h-6" />
          <span className={`text-lg font-semibold ${!isActive('/pedidos') && 'underline'}`}>
            Pedidos
          </span>
        </Link>

        <Link 
          to="/envios" 
          className={`flex items-center gap-3 px-6 py-4 mb-2 hover:bg-gray-50 transition-colors cursor-pointer ${
            isActive('/envios') ? 'text-[#BC7D3B]' : 'text-[#163269]'
          }`}
        >
          <FaTruck className="w-6 h-6" />
          <span className={`text-lg font-semibold ${!isActive('/envios') && 'underline'}`}>
            Envíos
          </span>
        </Link>
      </nav>

      {/*User Profile*/}
      <div className="p-6 bg-[#E6E6E6] border-t border-[#B8B8B8]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-[#B8B8B8] rounded-full flex items-center justify-center">
              <FaUser className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="font-semibold text-black">Bienvenido</div>
              <div className="text-[#163269]">{userData?.nombre || 'Usuario'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-100 rounded-full transition-colors group"
            title="Cerrar sesión"
          >
            <FaSignOutAlt className="w-5 h-5 text-red-600 group-hover:text-red-700" />
          </button>
        </div>
      </div>
    </div>
  );
}