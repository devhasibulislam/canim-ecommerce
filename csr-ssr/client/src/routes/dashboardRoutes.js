import Dashboard from "../layouts/dashboard/Dashboard";
import AddNewProduct from "../pages/dashboard/product/AddNewProduct";
import Analytics from "../pages/dashboard/Analytics";
import UpdateProduct from "../pages/dashboard/product/UpdateProduct";
import PrivateRoute from "../utils/PrivateRoutes";
import SplitRouter from "./SplitRouter";
import ListProduct from "../pages/dashboard/product/ListProduct";
import AddNewCategory from "../pages/dashboard/category/AddNewCategory";
import ListCategory from "../pages/dashboard/category/ListCategory";
import UpdateCategory from "../pages/dashboard/category/UpdateCategory";
import AddNewSubcategory from "../pages/dashboard/subcategory/AddNewSubcategory";
import ListSubcategory from "../pages/dashboard/subcategory/ListSubcategory";
import UpdateSubcategory from "../pages/dashboard/subcategory/UpdateSubcategory";
import AddNewBrand from "../pages/dashboard/brand/AddNewBrand";
import ListBrand from "../pages/dashboard/brand/ListBrand";
import UpdateBrand from "../pages/dashboard/brand/UpdateBrand";
import AddNewStore from "../pages/dashboard/store/AddNewStore";
import ListStore from "../pages/dashboard/store/ListStore";
import UpdateStore from "../pages/dashboard/store/UpdateStore";
import ListUser from "../pages/dashboard/ListUser";

const dashboardRoutes = {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <SplitRouter>
        <Dashboard />
      </SplitRouter>
    </PrivateRoute>
  ),
  children: [
    {
      path: "/dashboard",
      element: <SplitRouter>{<Analytics />}</SplitRouter>,
    },
    {
      path: "add-new-product",
      element: <SplitRouter>{<AddNewProduct />}</SplitRouter>,
    },
    {
      path: "list-product",
      element: <SplitRouter>{<ListProduct />}</SplitRouter>,
    },
    {
      path: "update-product/:pid",
      element: <SplitRouter>{<UpdateProduct />}</SplitRouter>,
    },
    {
      path: "add-new-category",
      element: <SplitRouter>{<AddNewCategory />}</SplitRouter>,
    },
    {
      path: "list-category",
      element: <SplitRouter>{<ListCategory />}</SplitRouter>,
    },
    {
      path: "update-category/:cid",
      element: <SplitRouter>{<UpdateCategory />}</SplitRouter>,
    },
    {
      path: "add-new-subcategory",
      element: <SplitRouter>{<AddNewSubcategory />}</SplitRouter>,
    },
    {
      path: "list-subcategory",
      element: <SplitRouter>{<ListSubcategory />}</SplitRouter>,
    },
    {
      path: "update-subcategory/:scid",
      element: <SplitRouter>{<UpdateSubcategory />}</SplitRouter>,
    },
    {
      path: "add-new-brand",
      element: <SplitRouter>{<AddNewBrand />}</SplitRouter>,
    },
    {
      path: "list-brand",
      element: <SplitRouter>{<ListBrand />}</SplitRouter>,
    },
    {
      path: "update-brand/:bid",
      element: <SplitRouter>{<UpdateBrand />}</SplitRouter>,
    },
    {
      path: "add-new-store",
      element: <SplitRouter>{<AddNewStore />}</SplitRouter>,
    },
    {
      path: "list-store",
      element: <SplitRouter>{<ListStore />}</SplitRouter>,
    },
    {
      path: "update-store/:sid",
      element: <SplitRouter>{<UpdateStore />}</SplitRouter>,
    },
    {
      path: "list-user",
      element: <SplitRouter>{<ListUser />}</SplitRouter>,
    },
  ],
};

export default dashboardRoutes;
