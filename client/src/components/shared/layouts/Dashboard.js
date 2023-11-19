/**
 * Title: Write a program using JavaScript on Dashboard
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 09, November 2023
 */

"use client";

import React from "react";
import Sidebar from "../Sidebar";
import Container from "../Container";
import PrivateRoute from "../PrivateRoute";

const Dashboard = ({ children }) => {
  return (
    <Container className="p-4 md:h-screen min-h-screen ">
      <PrivateRoute allowedRoles={["admin", "seller"]}>
        <section className="grid grid-cols-12 gap-4 h-full">
          <Sidebar />
          <div className="md:col-span-9 col-span-12 overflow-y-auto rounded">
            {children}
          </div>
        </section>
      </PrivateRoute>
    </Container>
  );
};

export default Dashboard;
