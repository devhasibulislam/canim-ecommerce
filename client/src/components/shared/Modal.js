/**
 * Title: Write a program using JavaScript on Modal
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
 * Date: 13, November 2023
 */

import React from "react";

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-secondary/10 backdrop-blur-sm backdrop-filter bg-opacity-100"
        onClick={onClose}
      ></div>
      <div
        className={
          "z-10 bg-white rounded p-secondary shadow-lg border border-primary" +
          ` ${className}`
        }
      >
        {children}
      </div>
    </section>
  );
};

export default Modal;
