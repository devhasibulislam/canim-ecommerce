import React, { Suspense } from "react";
import FullScreenLoading from "../components/loading/FullScreenLoading";

const SplitRouter = ({ children }) => {
  return <Suspense fallback={<FullScreenLoading />}>{children}</Suspense>;
};

export default SplitRouter;
