import React, { useState, useEffect } from 'react';
import { Avatar, message } from 'antd';
import { DeleteOutlined, EditOutlined, LockOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InventarioList() {
    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState('');
    
    const fetchArticulos = async () => {
        try {
            const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
            const response = await axios.get(`${baseUrl}/articulos/list`);

            setArticulos(response.data.data);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al cargar pedidos';
            setError(errorMsg);
            message.error(errorMsg);
        }
    }

    useEffect(() => {
        fetchArticulos();
    }, []);

    return (
        <div className="w-full">
            <div className="max-w-5xl">
                {/* Header */}
                    <h1 className="text-3xl font-bold mb-5 pb-4 border-b-4" style={{ color: '#163269', borderColor: '#163269' }}>
                        Inventario
                    </h1>
            </div>

            {/* New Article Button */}
            <div className="flex justify-end mb-6">
                <button className="px-6 py-3 bg-white border-2 border-black rounded-lg shadow-md hover:bg-gray-50 transition-colors font-medium text-lg">
                    Nuevo artículo
                </button>
                </div>

                {/* Inventory Table Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="text-center py-4" style={{ backgroundColor: '#5DADE2' }}>
                        <h2 className="text-2xl font-bold text-inventory-navy">
                        Inventario actual
                        </h2>
                </div>
                
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-200">
                        <th className="px-4 py-4 text-left text-sm lg:text-lg font-bold text-black">
                            Codigo
                        </th>
                        <th className="px-4 py-4 text-left text-sm lg:text-lg font-bold text-black">
                            Articulo
                        </th>
                        <th className="px-4 py-4 text-left text-sm lg:text-lg font-bold text-black">
                            Costo (L.)
                        </th>
                        <th className="px-4 py-4 text-left text-sm lg:text-lg font-bold text-black">
                            Precio (L.)
                        </th>
                        <th className="px-4 py-4 text-left text-sm lg:text-lg font-bold text-black">
                            Costo Util (L.)
                        </th>
                        <th className="px-4 py-4 text-left text-sm lg:text-lg font-bold text-black">
                            En Existencia
                        </th>
                        <th className="px-4 py-4 text-left text-sm lg:text-lg font-bold text-black">
                            Disponible
                        </th>
                        <th className="px-4 py-4 text-right text-sm lg:text-lg font-bold text-black">
                            Acciones
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulos.map((item, index) => (
                        <tr
                            key={item.codigo}
                            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                        >
                            <td className="px-4 py-4 text-sm lg:text-lg text-black">
                            {item.codigo}
                            </td>
                            <td className="px-4 py-4 text-sm lg:text-lg text-black">
                            {item.nombre}
                            </td>
                            <td className="px-4 py-4 text-sm lg:text-lg text-black">
                            {Number(item.costo_unitario).toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-sm lg:text-lg text-black">
                            {Number(item.precio).toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-sm lg:text-lg text-black">
                            {(Number(item.precio) - Number(item.costo_unitario)).toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-sm lg:text-lg text-black">
                            {Number(item.cantidad_existencia)}
                            </td>
                            <td className="px-4 py-4 text-sm lg:text-lg text-black">
                            {item.estado}
                            </td>
                            <td className="px-4 py-4">
                            <div className="flex items-center justify-end gap-2">
                                <button
                                className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                                title="Editar"
                                >
                                <EditOutlined className="w-5 h-5 text-black" />
                                </button>
                                <button
                                className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                                title="Eliminar"
                                >
                                <DeleteOutlined className="w-5 h-5 text-black" />
                                </button>
                                <button
                                className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                                title="Añadir"
                                >
                                <PlusCircleOutlined className="w-5 h-5 text-black" />
                                </button>
                                <button
                                className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                                title="Bloquear"
                                >
                                <LockOutlined className="w-5 h-5 text-black" />
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InventarioList