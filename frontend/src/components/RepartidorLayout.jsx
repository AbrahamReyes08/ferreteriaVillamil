import { Outlet } from "react-router-dom";
import { SidebarRepartidor } from "./SidebarRepartidor";

export default function RepartidorLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarRepartidor />
      <div className="flex-1 overflow-y-auto p-10 md:ml-72 ml-0 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
}
