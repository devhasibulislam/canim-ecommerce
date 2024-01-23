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
import AnimatedCursor from "react-animated-cursor";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <AnimatedCursor
        innerSize={10}
        color="0, 0, 0"
        showSystemCursor={false}
      />
    </Provider>
  );
};

export default Providers;
