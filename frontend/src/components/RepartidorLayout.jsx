import { Outlet } from "react-router-dom";
import { SidebarRepartidor } from "./SidebarRepartidor";

export default function RepartidorLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarRepartidor />
      <div className="flex-1 overflow-y-auto p-10">
        <Outlet />
      </div>
    </div>
  );
}
