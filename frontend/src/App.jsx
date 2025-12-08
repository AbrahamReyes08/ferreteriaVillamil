import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página sin sidebar */}
        <Route path="/" element={<Home />} />

        {/* Páginas que llevan sidebar del admin*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<h1 className="text-3xl">Panel Admin</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
