import React from "react";

const NotFound = () => {
  return (
    <section className="fixed top-0 left-0 h-screen w-screen overflow-hidden flex justify-center items-center bg-white z-50">
      <img
        src="/404.gif"
        alt="not found"
        loading="lazy"
        className="max-w-full"
      />
    </section>
  );
};

export default NotFound;
