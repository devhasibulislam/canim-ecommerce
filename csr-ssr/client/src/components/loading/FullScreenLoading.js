import React from "react";
import LazyLoadingImage from "../LazyLoadingImage";

const FullScreenLoading = () => {
  return (
    <section className="fixed top-0 left-0 h-screen w-screen overflow-hidden flex justify-center items-center bg-white z-50">
      <LazyLoadingImage
        src="/loading.gif"
        alt="loading"
        loading="lazy"
        className="max-w-full"
      />
    </section>
  );
};

export default FullScreenLoading;
