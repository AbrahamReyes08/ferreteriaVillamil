import React, { useState, useEffect } from "react";
import { message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import CancelarEnvioModal from "./CancelarEnvioModal";
import DetallePedidoModal from "./DetallePedidoModal";

function ListEnviosAdmin() {
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterValue, setFilterValue] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEnvio, setSelectedEnvio] = useState(null);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  
  const handleOpenModal = (envio) => {
    setSelectedEnvio(envio);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEnvio(null);
    fetchEnvios();
  };

  const handleVerDetalles = (envio) => {
    setSelectedEnvio(envio);
    setShowDetalleModal(true);
  };

  const handleCloseDetalleModal = () => {
    setShowDetalleModal(false);
    setSelectedEnvio(null);
  };

  useEffect(() => {
    fetchEnvios();
    onChange("Pendiente");
  }, []);

  const fetchEnvios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || '/api'}/pedidos/getAllPedidos`
      );

      const enviosData = response.data.data || response.data;
      setEnvios(enviosData);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al cargar envios";
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
    <div className="w-full p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header (page) */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 border-b-4 gap-4"
          style={{ borderColor: "#163269" }}
        >
          <h1
            className="text-2xl sm:text-3xl font-bold pb-4"
            style={{ color: "#163269" }}
          >
            Lista de Envios
          </h1>

          <span className="text-lg sm:text-xl font-bold pb-4" style={{ color: "#163269" }}>
            Total de envios:{" "}
            {
              (filterValue
                ? envios.filter((p) => p.estado !== filterValue)
                : envios
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
              Cargando envios...
            </p>
          </div>
        ) : envios.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg" style={{ color: "#163269" }}>
              No hay envios existentes
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {(filterValue
              ? envios.filter((p) => p.estado !== filterValue)
              : envios
            ).map((envio) => (
              <div
                key={envio.id_pedido}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <p className="text-sm sm:text-base" style={{ color: "#163269" }}>
                      Cliente: {envio.cliente_nombre}
                    </p>
                    <p className="text-sm sm:text-base" style={{ color: "#163269" }}>
                      {envio.direccion_entrega}
                    </p>
                    <p className="text-sm sm:text-base" style={{ color: "#163269" }}>
                      Costo total: L.{envio.total}
                    </p>
                    <p className="text-sm sm:text-base" style={{ color: "#163269" }}>
                      Fecha de creación:{" "}
                      {new Date(envio.fecha_creacion).toLocaleDateString(
                        "es-HN"
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between items-end gap-2">
                    <span
                      className="px-4 sm:px-6 py-1 rounded-full text-white font-medium shadow-lg text-sm sm:text-base"
                      style={{
                        backgroundColor: handleEstadoColor(envio.estado),
                      }}
                    >
                      {envio.estado}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerDetalles(envio)}
                        className="px-3 py-1 text-white font-medium text-xs sm:text-sm rounded"
                        title="Ver detalles del envío"
                        style={{ backgroundColor: "#163269" }}
                      >
                        Ver Detalles
                      </button>
                      
                      {envio.estado !== "Cancelado" && envio.estado !== "Entregado" && (
                        <button
                          onClick={() => handleOpenModal(envio)}
                          className="px-3 py-1 text-white font-medium"
                          title="Cancelar envio"
                        >
                          <CloseCircleOutlined
                            className="text-lg sm:text-2xl"
                            style={{ color: "#163269" }}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        
      <CancelarEnvioModal
        isOpen={isModalVisible}
        onClose={handleCloseModal}
        pedidoId={selectedEnvio?.id_pedido}
      />

      {showDetalleModal && selectedEnvio && (
        <DetallePedidoModal 
          pedidoId={selectedEnvio.id_pedido || selectedEnvio.id}
          onClose={handleCloseDetalleModal}
        />
      )}
    </div>
  );
}

export default ListEnviosAdmin;
