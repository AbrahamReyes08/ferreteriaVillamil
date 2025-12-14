import React, { useState } from 'react';
import { Avatar, message } from 'antd';
import { UserOutlined, MailOutlined, EditOutlined, UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NuevoArticuloForm() {
    const [form, setForm] = useState({
        codigo: "", 
        nombre: "", 
        descripcion: "", 
        costo_unitario: "",
        precio: "",
        cantidad_existencia: "",
        stock_minimo: "",
        proveedor: "",
        estado: "Disponible",
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form)
    }

    const handleInteger = (event) => {
        const value = event.target.value.replace(/\D/g, ""); 
        handleChange({
            target: { name: event.target.name, value}
        });
    }

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api'}/articulos/new`, form);
            console.log(response.data);
            message.success('Artículo creado exitosamente');
            
            setForm({
                codigo: "", 
                nombre: "", 
                descripcion: "", 
                costo_unitario: "",
                precio: "",
                cantidad_existencia: "",
                stock_minimo: "",
                proveedor: "",
            })
            setLoading(false);
            navigate('/admin/inventario');
        } catch (err) {
            message.error('Error al crear artículo. Llene todos los campos');
        } finally {
            setLoading(false);
        }
    }

    const handleCancelar = () => {
        navigate('/admin/inventario');
    }

    return (
        <div className="w-full">
            <div className="max-w-5xl">
                {/* Header (page) */}
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-3xl font-bold pb-4 border-b-4 flex-1" style={{ color: '#163269', borderColor: '#163269' }}>
                    Nuevo Articulo
                    </h1>
                </div>

                {/* Código + Nombre */}
                <div className="flex gap-5 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Codigo:
                        </label>
                        <input
                            name = "codigo"
                            type="text"
                            value={form.codigo}
                            onChange={handleChange}
                            placeholder="Ingresa el codigo"
                            className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                            style={{ focusBorderColor: '#163269' }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Nombre:
                        </label>
                        <input
                            name = "nombre"
                            type="text"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Ingresa el nombre"
                            className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                            style={{ focusBorderColor: '#163269' }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                    </div>
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                        Descripción:
                    </label>
                    <textarea 
                        name = "descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        placeholder="Ingresa una descripción"
                        className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                        style={{ focusBorderColor: '#163269' }}
                        rows={3}
                        onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                        onInput={(e) => e.target.setCustomValidity('')}></textarea>
                </div>

                {/* Costo Compra + Costo Venta */}
                <div className="flex gap-5 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Costo Compra (L.):
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                                L.
                            </span>
                            <input
                                name="costo_unitario"
                                type="number"
                                value={form.costo_unitario}
                                onChange={handleChange}  
                                placeholder="Precio de venta"
                                className="w-full pl-10 pr-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                                required
                            />
                            </div>
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Costo Venta:
                        </label>

                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                                L.
                            </span>
                            <input
                                name = "precio"
                                type="number"
                                value={form.precio}
                                onChange={handleChange}
                                placeholder="Ingresa el precio de venta en Lempiras"
                                className="w-full pl-10 pr-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                                style={{ focusBorderColor: '#163269' }}
                                required
                                onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                />
                            </div>
                    </div>
                </div>

                {/* Inventarios */}
                <div className="flex gap-5 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Inventario Inicial:
                        </label>
                        <input
                            name = "cantidad_existencia"
                            type= "number"
                            value={form.cantidad_existencia}
                            onChange={handleInteger}
                            placeholder="Ingresa la cantidad de producto en unidades en existencia"
                            className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                            style={{ focusBorderColor: '#163269' }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Inventario mínimo:
                        </label>
                        <input
                            name = "stock_minimo"
                            type= "number"
                            value={form.stock_minimo}
                            onChange={handleInteger}
                            placeholder="Ingresa la cantidad mínima del producto antes de rellenar"
                            className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                            style={{ focusBorderColor: '#163269' }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                    </div>
                </div>

                {/* Proveedor + Costo utilitario */}
                <div className="flex gap-5 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Proveedor:
                        </label>
                        <input
                            name = "proveedor"
                            type= "text"
                            value={form.proveedor}
                            onChange={handleChange}
                            placeholder="Ingrese el proveedor"
                            className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                            style={{ focusBorderColor: '#163269' }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Costo Utilitario:
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                                L.
                            </span>
                            <input
                                name = "Costo utilitario"
                                type= "number"
                                value={form.precio-form.costo_unitario}
                                onChange={handleInteger}
                                placeholder="Ganancia o perdida de venta"
                                className="w-full pl-10 pr-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                                style={{ focusBorderColor: '#163269' }}
                                disabled
                                onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4 mt-6">
                    <button className="font-medium py-3 px-4 bg-gray-200 border border-gray-500 rounded-lg transition-colors disabled:cursor-not-allowed"
                        onClick={handleCancelar}
                        disable = {!loading}
                        style={{ 
                            color: 'gray-500',
                        }}>Cancelar
                    </button>
                    <button 
                        className="font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        style={{ 
                            backgroundColor: '#163269',
                            color: 'white'
                        }}>{loading ? "Agregando..." : "Agregar"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NuevoArticuloForm
