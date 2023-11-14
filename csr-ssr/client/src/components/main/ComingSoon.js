import React from "react";
import LazyLoadingImage from "../LazyLoadingImage";

const ComingSoon = () => {
  return (
    <>
      <LazyLoadingImage
        src={"/coming-soon.gif"}
        alt={"coming-soom"}
        className={"max-w-full object-contain h-full w-full"}
      />
    </>
  );
};

export default ComingSoon;
