/**
 * Title: Write a program using JavaScript on Container
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
 * Date: 09, October 2023
 */

import React from "react";

const Container = ({ className, children, ...props }) => {
  return (
    <section
      {...props}
      className={"max-w-7xl mx-auto px-4 w-full" + (className ? " " + className : "")}
    >
      {children}
    </section>
  );
};

export default Container;
