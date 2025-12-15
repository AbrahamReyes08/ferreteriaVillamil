import React, {useEffect, useState} from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import axios from 'axios';

function Card({ title, color, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className={`${color} px-4 py-2`}>
        <h3 className="text-white font-semibold">
          {title}
        </h3>
      </div>

      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function DashboardAdmin() {
    const [repartidores, setRepartidores] = useState([]);
    const [popular, setPopular] = useState([]);
    const [bajoInv, setBajoInv] = useState([]);
    const [capitalUtil, setCapitalUtil] = useState({
        pedidos_entregados: 0,
        costo_items: 0.0,
        ingresos_brut: 0.0,
        utilidad: 0.0
    });
    const [pedidosChart, setPedidosChart] = useState([])
    const COLORS = [
        "#ECB01F",
        "#163269",
        "#2C4D8E",
        "#5E9C08",
        "#BC7D3B",
        
    ]
    
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const now = new Date();
            await Promise.all([
            fetchRepartidores(now.getMonth() + 1, now.getFullYear()),
            fetchMasVendido(),
            fetchBajoInventario(),
            ]);
        } catch (error) {
            console.error("Error cargando dashboard", error);
        }
    };

    const fetchRepartidores = async (mes, anio) => {
        try {
            const [calificacionesRes, pedidosRes, usuariosRes, detallesRes, articulosRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_SERVER_URL}/calificaciones/list`),
                axios.get(`${import.meta.env.VITE_SERVER_URL}/pedidos/getAllPedidos`),
                axios.get(`${import.meta.env.VITE_SERVER_URL}/usuarios/usuarios`),
                axios.get(`${import.meta.env.VITE_SERVER_URL}/detalles/list`),
                axios.get(`${import.meta.env.VITE_SERVER_URL}/articulos/list`)
            ]);

            const calificacionesMap = new Map();
            calificacionesRes.data.data.forEach(c => {
                calificacionesMap.set(c.id_pedido, c.puntuacion);
            });

            const usuariosMap = new Map();
            usuariosRes.data.forEach(u => {
                usuariosMap.set(u.id_usuario, u.nombre);
            });

            const detallesMap = new Map();
            detallesRes.data.data.forEach(d => {
                if (!detallesMap.has(d.id_pedido)) detallesMap.set(d.id_pedido, []);
                detallesMap.get(d.id_pedido).push(d);
            });

            const articulosMap = new Map();
            articulosRes.data.data.forEach(a => {
                articulosMap.set(a.id_articulo, a);
            });

            const estadosCount = pedidosRes.data.data.reduce((acc, p) => {
                acc[p.estado] = (acc[p.estado] || 0) + 1;
                return acc;
            }, {});

            const pedidosChartData = [
                { name: "Pendiente", value: estadosCount["Pendiente"] || 0 },
                { name: "Asignado", value: estadosCount["Asignado"] || 0 },
                { name: "En transcurso", value: estadosCount["En transcurso"] || 0 },
                { name: "Entregado", value: estadosCount["Entregado"] || 0 },
                { name: "Cancelado", value: estadosCount["Cancelado"] || 0 },
            ];

            setPedidosChart(pedidosChartData);

             const pedidosEntregados = pedidosRes.data.data.filter(pedido => {
                if (pedido.estado !== "Entregado") return false;
                const fecha = new Date(pedido.fecha_entrega);
                return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
            });

            const resumenRepartidores = pedidosEntregados.reduce((acc, item) => {
                if (!acc[item.id_repartidor_asignado]) {
                    acc[item.id_repartidor_asignado] = {
                    id_repartidor_asignado: item.id_repartidor_asignado,
                    envios: 0,
                    totalEstrellas: 0,
                    calificados: 0
                    };
                }

                acc[item.id_repartidor_asignado].envios += 1;
                const puntos = calificacionesMap.get(item.id_pedido);
                if (puntos !== null) {
                    acc[item.id_repartidor_asignado].totalEstrellas += puntos;
                    acc[item.id_repartidor_asignado].calificados += 1;
                }

                return acc;
            }, {});
            const resultadoFinal = Object.values(resumenRepartidores)
            .map(r => ({
                repartidor: usuariosMap.get(r.id_repartidor_asignado) ?? "Desconocido",
                envios: r.envios,
                promedio:
                    r.calificados > 0
                    ? (r.totalEstrellas / r.calificados).toFixed(2)
                    : "N/A"
                }))
            .sort((a,b) => b.promedio - a.promedio);
            setRepartidores(resultadoFinal);

            // Sección de ingresos
            let pedidos_count = pedidosEntregados.length;
            let costo_items = 0;
            let ingresos_brut = 0;
            console.log(articulosMap)

            pedidosEntregados.forEach(pedido => {
                ingresos_brut += Number(pedido.total) ?? 0;

                const detalles = detallesMap.get(pedido.id_pedido) || [];
                detalles.forEach(d => {
                    const articulo = articulosMap.get(d.id_articulo);
                    const precio_compra = Number(articulo?.costo_unitario) ?? 0;
                    costo_items += Number(d.cantidad) * precio_compra;
                });
            });

            const utilidad = ingresos_brut - costo_items;

            const resumenIngresos = {
                pedidos_entregados: pedidos_count,
                costo_items,
                ingresos_brut,
                utilidad
            };

            setCapitalUtil(resumenIngresos);
            console.log(resumenIngresos);
        } catch (err ){
            console.error("Error cargando repartidores", err);
        }
    }

    const fetchMasVendido = async () => {
        try {
            const [detallesRes, articulosRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_SERVER_URL}/detalles/list`),
                axios.get(`${import.meta.env.VITE_SERVER_URL}/articulos/list`),
            ]);
            const detallesMap = new Map();
            detallesRes.data.data.forEach(d => {
                if (detallesMap.has(d.id_articulo)) {
                    detallesMap.set(d.id_articulo, detallesMap.get(d.id_articulo) + d.cantidad);
                } else {
                    detallesMap.set(d.id_articulo, d.cantidad);
                }
            });

            const articulosMap = new Map();
            articulosRes.data.data.forEach(a => {
                articulosMap.set(a.id_articulo, a); 
            });


            const masVendidos = Array.from(detallesMap.entries())
                .map(([id_articulo, cantidad]) => {
                    const articulo = articulosMap.get(id_articulo);
                    return {
                        id_articulo,
                        nombre: articulo?.nombre ?? "Desconocido",
                        cantidad_vendida: cantidad,
                        inventario_actual: articulo?.cantidad_existencia ?? 0
                    };
                })
                .sort((a, b) => b.cantidad_vendida - a.cantidad_vendida); 

            setPopular(masVendidos);
        } catch (err) {
            console.error("Error cargando más vendidos", err);
        }
    }

    const fetchBajoInventario = async () => {
        try {
            const articulosRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/articulos/low-stock`);

            const lowStock = articulosRes.data.data.map((a) => ({
                id_articulo: a.id_articulo,
                nombre: a.nombre,
                existencia: a.cantidad_existencia,
                minimo: a.stock_minimo
            }));

            setBajoInv(lowStock);
        } catch (error) {
            console.error("Error cargando bajo inventario", error)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
            <h1
                className="text-3xl font-bold pb-4 border-b-4 flex-1"
                style={{ color: "#163269", borderColor: "#163269" }}
            >
                Dashbord
            </h1>
            </div>
            

            {/* GRID */}
            <div className="grid py-3 grid-cols-3 gap-6">
                <Card title="Informe repartidores" color="bg-[#163269]">
                    <div className="max-h-[150px] overflow-y-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b">
                                <th >Nombre</th>
                                <th className="text-right">Entregas</th>
                                <th className="text-right">Valor.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    repartidores.map((repartidor) => (
                                        <tr key={repartidor.repartidor}>
                                            <td className="truncate max-w-[100px]">
                                                {repartidor.repartidor}
                                            </td>
                                            <td className="text-right">
                                                {repartidor.envios}
                                            </td>
                                            <td className="text-right">
                                                {repartidor.promedio}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card title="Lo más vendido" color="bg-[#163269]">
                    <div className="max-h-[150px] overflow-y-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b">
                                <th>Articulo</th>
                                <th className="text-right">Ventas</th>
                                <th className="text-right">Inventario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    popular.map((item) => (
                                        <tr key={item.id_articulo}>
                                            <td className="truncate max-w-[100px]">
                                                {item.nombre}
                                            </td>
                                            <td className="text-right">
                                                {item.cantidad_vendida}
                                            </td>
                                            <td className="text-right">
                                                {item.inventario_actual}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card title="Bajo en inventario" color="bg-red-400">
                    <div className="max-h-[150px] overflow-y-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b">
                                <th >Articulo</th>
                                <th className="text-right">Existencia</th>
                                <th className="text-right">Minimo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bajoInv.map((articulo) => (
                                        <tr key={articulo.id_articulo}>
                                            <td className="truncate max-w-[100px]">
                                                {articulo.nombre}
                                            </td>
                                            <td className="text-right">
                                                {articulo.existencia}
                                            </td>
                                            <td className="text-right">
                                                {articulo.minimo}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
            <div className='grid py-3 grid-cols-2 gap-6'>
                {/* fila inferior */}
                <div >
                <Card title="Pedidos" color="bg-[#163269]">
                    <div className="h-[200px] w-[400px] overflow-y-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                data={pedidosChart}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                label
                                >
                                {pedidosChart.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical"
                                    verticalAlign="middle"
                                    align="right"/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                </div>

                <Card title="Ingresos del mes" color="bg-yellow-400">
                    <div className="max-h-[150px] overflow-y-auto">
                        <div><strong>Pedidos entregados:</strong> {capitalUtil.pedidos_entregados}</div>
                        <div><strong>Costo de items:</strong> L.{capitalUtil.costo_items.toFixed(2)}</div>
                        <div><strong>Ingresos brutos:</strong> L.{capitalUtil.ingresos_brut.toFixed(2)}</div>
                        <div><strong>Utilidad:</strong> L.{capitalUtil.utilidad.toFixed(2)}</div>
                    </div>
                </Card>
            </div>
        </div>
    );
}



export default DashboardAdmin