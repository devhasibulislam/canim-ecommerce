import { createBrowserRouter } from "react-router-dom";
import mainRoutes from "./mainRoutes";
import dashboardRoutes from "./dashboardRoutes";

const routes = createBrowserRouter([mainRoutes, dashboardRoutes]);

export default routes;
