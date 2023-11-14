import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";

const Main = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <div className="p-8" />
      <Footer />
    </>
  );
};

export default Main;
