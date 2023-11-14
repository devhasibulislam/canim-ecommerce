/**
 * Title: Write a program using JavaScript on OutsideClick
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
 * Date: 08, November 2023
 */

import { useEffect, useRef, useCallback } from "react";

const OutsideClick = ({ onOutsideClick, children, className }) => {
  const wrapperRef = useRef(null);

  const handleOutsideClick = useCallback(
    (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    },
    [onOutsideClick]
  );

  useEffect(() => {
    const handleOutsideClickEvent = (event) => handleOutsideClick(event);
    document.addEventListener("mousedown", handleOutsideClickEvent);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickEvent);
    };
  }, [handleOutsideClick]);

  return (
    <div ref={wrapperRef} className={"z-50 mt-2" + " " + (className && className)}>
      {children}
    </div>
  );
};

export default OutsideClick;
