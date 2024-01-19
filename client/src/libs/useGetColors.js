/**
 * Title: Write a program using JavaScript on UseGetColors
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
 * Date: 17, January 2024
 */

import { useEffect, useState } from "react";

function useGetColors() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.csscolorsapi.com/api/colors");
        const data = await response.json();
        if (data?.colors) setColors(data?.colors);
        else console.log(data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchData();
  }, []);

  return colors;
}

export default useGetColors;
