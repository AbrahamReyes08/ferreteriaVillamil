import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout.jsx";
import RepartidorLayout from "./components/RepartidorLayout.jsx";
import LoginForm from "./components/LoginForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CrearUsuario from "./components/CrearUsuario.jsx";
import UserListAdmin from "./components/UserListAdmin.jsx";
import PedidoCardRepartidor from "./components/PedidoCardRepartidor.jsx";
import ListaPedidosRepartidor from "./components/ListaPedidosRepartidor.jsx";
import NuevoArticuloForm from "./components/ItemForm.jsx";
import InventarioList from "./components/InventarioList.jsx";
import ListaPedidosAdmin from "./components/ListaPedidosAdmin.jsx";
import NuevoPedidoForm from "./components/PedidoForm.jsx";
import ListEnviosAdmin from "./components/ListEnviosAdmin.jsx";
import DashboardAdmin from "./components/DashboardAdmin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página sin sidebar */}
        <Route path="/" element={<LoginForm />} />

        {/* Páginas que llevan sidebar del admin - PROTEGIDAS */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<h1 className="text-3xl">Panel Admin</h1>} />
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="usuarios/crear-usuario" element={<CrearUsuario />} />
          <Route path="usuarios" element={<UserListAdmin />} />
          <Route path="inventario/crear-articulo" element={<NuevoArticuloForm />} />
          <Route path="inventario" element={<InventarioList />} />
          <Route path="pedidos" element={<ListaPedidosAdmin />} />
          <Route path="pedidos/crear-pedido" element={<NuevoPedidoForm />} />
          <Route path="envios" element={<ListEnviosAdmin />} />
        </Route>

        {/* Páginas que llevan sidebar del repartidor - PROTEGIDAS */}
        <Route
          path="/repartidor"
          element={
            <ProtectedRoute requiredRole="Repartidor">
              <RepartidorLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<h1 className="text-3xl">Panel Repartidor</h1>}
          />
          <Route path="pedido/:id" element={<PedidoCardRepartidor />} />
          <Route path="pedidos" element={<ListaPedidosRepartidor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
