import { Outlet } from "react-router-dom";
import { SidebarAdmin } from "./SidebarAdmin";

export default function AdminLayout() {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}
