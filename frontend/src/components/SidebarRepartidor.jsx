import React from "react";
import { FaHome, FaUser, FaHistory  } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/LogoFerreteriaVillamil.png";

export function SidebarRepartidor() {
  const location = useLocation();

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
          to="/historial" 
          className={`flex items-center gap-3 px-6 py-4 mb-2 hover:bg-gray-50 transition-colors cursor-pointer ${
            isActive('/historial') ? 'text-[#BC7D3B]' : 'text-[#163269]'
          }`}
        >
          <FaHistory className="w-6 h-6" />
          <span className={`text-lg font-semibold ${!isActive('/historial') && 'underline'}`}>
            Historial
          </span>
        </Link>

        <Link 
          to="/perfil" 
          className={`flex items-center gap-3 px-6 py-4 mb-2 hover:bg-gray-50 transition-colors cursor-pointer ${
            isActive('/perfil') ? 'text-[#BC7D3B]' : 'text-[#163269]'
          }`}
        >
          <FaUser className="w-6 h-6" />
          <span className={`text-lg font-semibold ${!isActive('/perfil') && 'underline'}`}>
            Perfil
          </span>
        </Link>

        
      </nav>

      {/*User Profile*/}
      <div className="p-6 bg-[#E6E6E6] border-t border-[#B8B8B8]">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-[#B8B8B8] rounded-full flex items-center justify-center">
            <FaUser className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="font-semibold text-black">Bienvenido</div>
            <div className="text-[#163269]">Josue</div>
          </div>
        </div>
      </div>
    </div>
  );
}