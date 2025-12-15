import React, { useState, useEffect } from "react";
import { Cascader, message } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetallePedidoModal from "./DetallePedidoModal";

function ListaPedidosRepartidor() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterValue, setFilterValue] = useState(null);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  const options = [
    {
      value: "Estado",
      label: "Estado de Pedido",
      children: [
        {
          value: "Entregado",
          label: "Entregado",
        },
        {
          value: "Cancelado",
          label: "Cancelado",
        },
      ],
    },
  ];

  //cargar pedidos a la hora de entrar
  useEffect(() => {
    fetchPedidos();
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

      const baseUrl =
        import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
      console.log(baseUrl);
      const response = await axios.get(
        `${baseUrl}/pedidos/repartidor/${repartidorId}/pedidos`
      );

      const pedidosData = response.data.data || response.data;
      setPedidos(pedidosData.filter((p) => p.estado === "Entregado" || p.estado === "Cancelado"));
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al cargar pedidos";
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEstadoColor = (estado) => {
    if (estado === "Entregado") {
      return "#5E9C08";
    } else if (estado === "Cancelado") {
      return "#BC7D3B";
    } else if (estado === "En Transcurso") {
      return "#2C4D8E";
    } else if (estado === "Pendiente") {
      return "#ECB01F";
    }
    return "#163269";
  };

  const onChange = (value) => {
    setFilterValue(value && value.length ? value[value.length - 1] : null);
  };

  const handleVerDetalles = (pedido) => {
    setSelectedPedido(pedido);
    setShowDetalleModal(true);
  };

  const handleCloseDetalleModal = () => {
    setShowDetalleModal(false);
    setSelectedPedido(null);
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl">
        {/* Header (page) */}
        <div
          className="flex items-center justify-between mb-5 border-b-4"
          style={{ borderColor: "#163269" }}
        >
          <h1
            className="text-3xl font-bold pb-4 flex-1"
            style={{ color: "#163269" }}
          >
            Lista de Pedidos
          </h1>
          <span
            className="text-xl font-bold pb-4 "
            style={{ color: "#163269" }}
          >
            Total de pedidos:{" "}
            {
              (filterValue
                ? pedidos.filter((p) => p.estado === filterValue)
                : pedidos
              ).length
            }
          </span>
        </div>
        <div className="flex items-center justify-end mb-1 gap-1">
          <span
            className="text-xl pb-4 flex items-center gap-2 cursor-pointer"
            style={{ color: "#163269" }}
          >
            <Cascader
              options={options}
              onChange={onChange}
              placeholder={
                <span className="flex items-center gap-2">
                  <FilterOutlined /> Filtrar
                </span>
              }
            />
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
              No hay pedidos asignados
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
                <div className="p-6 flex items-end justify-between">
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
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className="px-6 py-1 rounded-full text-white font-medium shadow-lg"
                      style={{
                        backgroundColor: handleEstadoColor(pedido.estado),
                      }}
                    >
                      {pedido.estado}
                    </span>
                    <button
                      onClick={() => handleVerDetalles(pedido)}
                      className="px-3 py-1 text-white font-medium text-sm rounded"
                      title="Ver detalles del pedido"
                      style={{ backgroundColor: "#163269" }}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDetalleModal && selectedPedido && (
        <DetallePedidoModal 
          pedidoId={selectedPedido.id_pedido || selectedPedido.id}
          onClose={handleCloseDetalleModal}
        />
      )}
    </div>
  );
}

export default ListaPedidosRepartidor;
