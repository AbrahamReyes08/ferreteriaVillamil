import { Outlet } from "react-router-dom";
import { SidebarRepartidor } from "./SidebarRepartidor";

export default function RepartidorLayout() {
  return (
    <div className="flex">
      <SidebarRepartidor />
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}
