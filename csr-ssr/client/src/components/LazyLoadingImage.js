import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LazyLoadingImage = ({ src, alt, height, width, className }) => {
  return (
    <>
      <LazyLoadImage
        src={src}
        alt={alt}
        height={height}
        width={width}
        placeholderSrc="/placeholder.svg"
        className={`max-w-full object-cover object-center ${className}`}
      />
    </>
  );
};

export default LazyLoadingImage;
