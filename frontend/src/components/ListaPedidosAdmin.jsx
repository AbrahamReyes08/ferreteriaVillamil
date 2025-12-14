import React, { useState, useEffect } from "react";
import { message } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListaPedidosAdmin() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterValue, setFilterValue] = useState(null);

  // Cargar pedidos al montar el componente
  useEffect(() => {
    fetchPedidos();
    onChange("Pendiente");
  }, []);

  const fetchPedidos = async () => {
    setLoading(true);
    try {
      // Obtener usuario logueado
      const usuarioStorage = sessionStorage.getItem("usuario");
      if (!usuarioStorage) {
        throw new Error("No hay sesión activa");
      }
      const usuario = JSON.parse(usuarioStorage);
      const repartidorId = usuario.id_usuario;

      const response = await axios.get(
        `http://localhost:3000/api/pedidos/getAllPedidos`
      );

      const pedidosData = response.data.data || response.data;
      setPedidos(pedidosData);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al cargar pedidos";
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEstadoColor = (estado) => {
    if (estado === "Entregado") return "#5E9C08";
    if (estado === "Cancelado") return "#BC7D3B";
    if (estado === "En Transcurso") return "#2C4D8E";
    if (estado === "Pendiente") return "#ECB01F";
    return "#163269";
  };

  const onChange = (value) => {
    setFilterValue("Pendiente");
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl">
        {/* Header (page) */}
        <div
          className="flex items-center justify-between mb-5 border-b-4 gap-4"
          style={{ borderColor: "#163269" }}
        >
          <h1
            className="text-3xl font-bold pb-4 flex-1"
            style={{ color: "#163269" }}
          >
            Lista de Pedidos
          </h1>

          <span className="text-xl font-bold pb-4" style={{ color: "#163269" }}>
            Total de pedidos pendientes de asignar:{" "}
            {
              (filterValue
                ? pedidos.filter((p) => p.estado === filterValue)
                : pedidos
              ).length
            }
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <p className="text-lg" style={{ color: "#163269" }}>
              Cargando pedidos...
            </p>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg" style={{ color: "#163269" }}>
              No hay pedidos existentes
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {(filterValue
              ? pedidos.filter((p) => p.estado === filterValue)
              : pedidos
            ).map((pedido) => (
              <div
                key={pedido.id_pedido}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6 flex justify-between">
                  <div className="space-y-2">
                    <p className="text-base" style={{ color: "#163269" }}>
                      Cliente: {pedido.cliente_nombre}
                    </p>
                    <p className="text-base" style={{ color: "#163269" }}>
                      {pedido.direccion_entrega}
                    </p>
                    <p className="text-base" style={{ color: "#163269" }}>
                      Costo total: L.{pedido.total}
                    </p>
                    <p className="text-base" style={{ color: "#163269" }}>
                      Fecha de creación:{" "}
                      {new Date(pedido.fecha_creacion).toLocaleDateString(
                        "es-HN"
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <span
                      className="px-6 py-1 rounded-full text-white font-medium shadow-lg"
                      style={{
                        backgroundColor: handleEstadoColor(pedido.estado),
                      }}
                    >
                      {pedido.estado}
                    </span>

                    <button
                      className="px-5 py-1 text-white font-medium"
                      title="Asignar repartidor"
                    >
                      <SelectOutlined
                        className="text-2xl"
                        style={{ color: "#163269" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaPedidosAdmin;
