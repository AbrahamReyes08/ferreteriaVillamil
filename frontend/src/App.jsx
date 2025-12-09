import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout.jsx";
import RepartidorLayout from "./components/RepartidorLayout.jsx";
import LoginForm from "./components/LoginForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página sin sidebar */}
        <Route path="/" element={<LoginForm />} />

        {/* Páginas que llevan sidebar del admin - PROTEGIDAS */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="Administrador">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<h1 className="text-3xl">Panel Admin</h1>} />
        </Route>

        {/* Páginas que llevan sidebar del repartidor - PROTEGIDAS */}
        <Route path="/repartidor" element={
          <ProtectedRoute requiredRole="Repartidor">
            <RepartidorLayout />
          </ProtectedRoute>
        }>
          <Route index element={<h1 className="text-3xl">Panel Repartidor</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
