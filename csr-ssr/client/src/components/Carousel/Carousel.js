import Glide from "@glidejs/glide";
import { useImperativeHandle, useEffect, useRef, forwardRef } from "react";
import "@glidejs/glide/dist/css/glide.core.css";
import "../home/style.css";

export const Carousel = forwardRef(({ options, children }, ref) => {
  const sliderRef = useRef();

  useImperativeHandle(ref, () => sliderRef.current);

  useEffect(() => {
    const slider = new Glide(sliderRef.current, options);

    slider.mount();

    return () => slider.destroy();
  }, [options]);

  return (
    <div className="glide" ref={sliderRef}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">{children}</ul>
        <div
          className="glide__arrows flex gap-x-2 items-center lg:-top-[65px]"
          data-glide-el="controls"
        >
          <button
            className="glide__arrow glide__arrow--left"
            data-glide-dir="<"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                stroke="currentColor"
                strokeWidth="1.5"
                stroke-miterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M20.5 12H3.67004"
                stroke="currentColor"
                strokeWidth="1.5"
                stroke-miterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <button
            className="glide__arrow glide__arrow--right"
            data-glide-dir=">"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                stroke="currentColor"
                strokeWidth="1.5"
                stroke-miterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3.5 12H20.33"
                stroke="currentColor"
                strokeWidth="1.5"
                stroke-miterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

export const Slide = forwardRef(({ children }, ref) => {
  return (
    <li className="glide__slide" ref={ref}>
      {children}
    </li>
  );
});
