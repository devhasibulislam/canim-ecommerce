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

const Dashboard = ({ children }) => {
  return (
    <Container className="p-4 md:h-screen min-h-screen !max-w-5xl">
      <section className="grid grid-cols-12 gap-4 h-full overflow-y-auto">
        <Sidebar />
        <div className="md:col-span-8 col-span-12 overflow-y-auto rounded">
          {children}
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
