import React from "react";
import LazyLoadingImage from "../LazyLoadingImage";

const SecondaryLoading = () => {
  return (
    <>
      <section className="h-screen w-screen overflow-hidden flex justify-center items-center bg-white z-50">
        <LazyLoadingImage
          src="/secondary-loading.gif"
          alt="loading"
          loading="lazy"
          className="max-w-full"
        />
      </section>
    </>
  );
};

export default SecondaryLoading;
