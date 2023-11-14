import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dashboardRoutes from "./dashboardRoutes";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <section className="lg:col-span-2 md:col-span-1 col-span-12 bg-gray-100/70 shadow lg:p-4 md:p-4 p-2 rounded-lg">
        <ul className="flex gap-y-4  flex-col h-full">
          <li className="font-medium text-lg overflow-hidden text-ellipsis whitespace-nowrap flex gap-x-2 items-center">
            <HiChartPie className="lg:h-6 md:h-10 h-8 lg:w-6 md:w-10 w-8 lg:mx-0 md:mx-auto" />{" "}
            <span
              className="lg:inline-block md:hidden cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </span>
          </li>
          <hr />

          {dashboardRoutes.map((dashboardRoute, index) => (
            <li key={index} className="p-1 rounded-lg">
              <Link
                to={dashboardRoute.anchor}
                className={`overflow-hidden text-ellipsis whitespace-nowrap flex gap-x-2 items-center hover:underline ${
                  location.pathname.includes(dashboardRoute.anchor)
                    ? "border-l-2 pl-2 text-slate-500"
                    : null
                }`}
                title={dashboardRoute.name}
              >
                {dashboardRoute.icon}{" "}
                <span className="lg:inline-block md:hidden">
                  {dashboardRoute.name}
                </span>
              </Link>
            </li>
          ))}

          {/* redirect to home route */}
          <li className="mt-auto">
            <Link
              to="/"
              className="overflow-hidden text-ellipsis whitespace-nowrap flex gap-x-1 items-center hover:underline"
            >
              <HiHome className="lg:h-5 md:h-10 h-8 lg:w-5 md:w-10 w-8 lg:mx-0 md:mx-auto" />{" "}
              <span className="lg:inline-block md:hidden">Back to Home</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

function HiChartPie(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-pie-chart-fill"
      viewBox="0 0 16 16"
    >
      <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z" />
    </svg>
  );
}

function HiHome(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-house-door"
      viewBox="0 0 16 16"
    >
      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
    </svg>
  );
}

export default Sidebar;
