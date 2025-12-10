import { Outlet } from "react-router-dom";
import { SidebarAdmin } from "./SidebarAdmin";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdmin />
      <div className="flex-1 overflow-y-auto p-10">
        <Outlet />
      </div>
    </div>
  );
}
