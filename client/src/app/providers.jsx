/**
 * Title: Write a program using JavaScript on Providers
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

import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Providers;
