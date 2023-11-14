import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, stopLoading } from "./features/auth/authSlice";
import FullScreenLoading from "./components/loading/FullScreenLoading";

function App() {
  // grab user credentials from state
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token?.length) {
      dispatch(fetchUser(token));
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch]);

  return isLoading ? (
    <FullScreenLoading />
  ) : (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default App;
