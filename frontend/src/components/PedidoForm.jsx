import React, { useEffect, useState } from 'react';
import { Avatar, message } from 'antd';
import { UserOutlined, MailOutlined, EditOutlined, UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NuevoPedidoForm() {
    const [form, setForm] = useState({
        id_pedido: "",
        numero_pedido: "",
        cliente_nombre: "",
        cliente_telefono: "",
        cliente_identidad: "",
        id_admin_creador: "",
        estado: 'Asignado',
        codigo_confirmacion: "",
        costo_envio: "",
        total: "",
        direccion_entrega: "",
        observacion: "",
    })
    const [loading, setLoading] = useState(false);

    const [articulos, setArticulos] = useState([]);     
    const [selectedArticulo, setSelectedArticulo] = useState(""); 
    const [cantidad, setCantidad] = useState(1);

    const [detalles, setDetalles] = useState([]); 

    // Para calcular total
    const [totalPedido, setTotalPedido] = useState(0);

    const fetchArticulos = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api'}/articulos/list`
            );

            setArticulos(response.data.data)
        } catch (error) {
            console.error("Error cargando artículos:", err);
        }
    }

    useEffect(() => {
        fetchArticulos();
    }, []);

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form)
    }

    const handleIdentidad = (event) => {
        const value = event.target.value.replace(/\D/g, ""); 
            if (v.length > 4 && v.length <= 8) {
                v = v.slice(0, 4) + "-" + v.slice(4);
            } else if (v.length > 8) {
                v = v.slice(0, 4) + "-" + v.slice(4, 8) + "-" + v.slice(8, 13);
            }

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
        } catch (err) {
            message.error('Error al crear artículo');
        } finally {
            setLoading(false);
        }
    }

    const agregarArticulo = () => {
        if (!selectedArticulo) return;
        console.log(selectedArticulo);

        const art = articulos.find(a => String(a.id_articulo) === selectedArticulo);
        console.log(art);
        if (!art) return;

        const existe = detalles.find(d => d.id_articulo === art.id_articulo);
        if (existe) {
            const nuevos = detalles.map(d =>
                d.id_articulo === art.id_articulo ? { ...d, cantidad: d.cantidad + Number(cantidad) } : d
            );
            setDetalles(nuevos);
        } else {
            setDetalles([
                ...detalles,
                {
                    id: art.id_articulo,
                    nombre: art.nombre,
                    precio: art.precio,
                    cantidad: Number(cantidad)
                }
            ]);
        }

        // reset del selector
        setSelectedArticulo("");
        setCantidad(1);
    };

    return (
        <div className="w-full">
            <div className="max-w-5xl">
                {/* Header (page) */}
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-3xl font-bold pb-4 border-b-4 flex-1" style={{ color: '#163269', borderColor: '#163269' }}>
                        Nuevo Pedido
                    </h1>
                </div>

                {/* Código*/}
                <div className="flex gap-5 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Número de pedido:
                        </label>
                        <input
                            name = "codigo"
                            type="text"
                            value={form.numero_pedido}
                            onChange={handleChange}
                            placeholder="Ingresa el número de pedido"
                            className="w-1/2 px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                            style={{ focusBorderColor: '#163269' }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el codigo')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                    </div>
                </div>

                {/* Nombre y teléfono*/}
                <div className="flex gap-5 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Nombre:
                        </label>
                        <input
                            name = "cliente_nombre"
                            type="text"
                            value={form.cliente_nombre}
                            onChange={handleChange}
                            placeholder="Ingresa el nombre del cliente"
                            className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                            style={{ focusBorderColor: '#163269' }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el codigo')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Telefono:
                        </label>
                        <input
                            name = "cliente_telefono"
                            type="text"
                            value={form.cliente_telefono}
                            onChange={handleChange}
                            placeholder="Ingresa el número de telefono del cliente"
                            className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                            style={{ focusBorderColor: '#163269' }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                    </div>
                </div>

                {/* Identidad*/}
                <div className="flex gap-5 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Identidad:
                        </label>
                        <input
                            name = "cliente_identidad"
                            type="text"
                            maxLength="17"
                            value={form.cliente_identidad}
                            onChange={handleIdentidad}
                            placeholder="Ingresa el número de identidad del cliente"
                            className="w-1/2 px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                            style={{ focusBorderColor: '#163269' }}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el codigo')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                    </div>
                </div>

                {/* Dirección de entrega */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                        Dirección:
                    </label>
                    <textarea 
                        name = "direccion_entrega"
                        value={form.direccion_entrega}
                        onChange={handleChange}
                        placeholder="Ingresa la dirección de entrega"
                        className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                        style={{ focusBorderColor: '#163269' }}
                        rows={3}
                        onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                        onInput={(e) => e.target.setCustomValidity('')}></textarea>
                </div>
                {/* Observación de entrega */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                        Observación:
                    </label>
                    <textarea 
                        name = "observacion"
                        value={form.observacion}
                        onChange={handleChange}
                        placeholder="Ingresa las observaciones adicionales para la entrega"
                        className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white transition-colors"
                        style={{ focusBorderColor: '#163269' }}
                        rows={3}
                        onInvalid={(e) => e.target.setCustomValidity('Por favor ingresa el nombre')}
                        onInput={(e) => e.target.setCustomValidity('')}></textarea>
                </div>

                {/*---AQUI VAN LOS DETALLES---*/}
                <div className=" p-4 rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-3" style={{ color: '#163269' }}>
                        Detalles del Pedido
                    </h2>

                    <div className="flex gap-4 mb-4">
                        {/* Selector de artículo */}
                        <select
                            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg"
                            name="articulo"
                            value={selectedArticulo}
                            onChange={(e) => {
                                setSelectedArticulo(e.target.value)
                            }}
                        >
                            <option value="">Seleccione un artículo</option>
                            {articulos.map(a => (
                                <option key={a.id_articulo} value={String(a.id_articulo)}>
                                    {a.codigo} - {a.nombre} — L.{a.precio}
                                </option>
                            ))}
                        </select>

                        {/* Cantidad */}
                        <input
                            type="number"
                            className="w-32 px-4 py-3 bg-white border border-gray-300 rounded-lg"
                            value={cantidad}
                            min={1}
                            onChange={(e) => setCantidad(e.target.value)}
                        />

                        {/* Botón agregar */}
                        <button
                            className="px-4 bg-green-600 text-white rounded-lg"
                            onClick={agregarArticulo}
                        >
                            Agregar
                        </button>
                    </div>
                    <table className="w-full bg-white border rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 text-left">Artículo</th>
                                <th className="p-2 text-left">Precio</th>
                                <th className="p-2 text-left">Cantidad</th>
                                <th className="p-2 text-left">Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {detalles.map((d, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{d.nombre}</td>
                                    <td className="p-2">L.{d.precio}</td>
                                    <td className="p-2">{d.cantidad}</td>
                                    <td className="p-2">L.{d.precio * d.cantidad}</td>
                                    <td className="p-2 text-right">
                                        <button 
                                            className="text-red-600"
                                            onClick={() => eliminarDetalle(i)}>
                                                Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>




                {/* Costo Envio + Total */}
                <div className="flex gap-5 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-2" style={{ color: '#163269' }}>
                            Costo Envio:
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

                {/* Botones */}
                <div className="flex justify-end gap-4 mt-6">
                    <button className="font-medium py-3 px-4 bg-gray-200 border border-gray-500 rounded-lg transition-colors disabled:cursor-not-allowed"
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
                        }}>Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NuevoPedidoForm
