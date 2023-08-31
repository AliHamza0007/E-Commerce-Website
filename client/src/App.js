import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import PageNotFound from "./Pages/PageNotFound";
import Dashboard from "./Pages/user/Dashboard";
import SignUp from "./Pages/auth/SignUp";
import PrivateRoute from "./route/PrivateRoute";
import ForgottenPassword from "./Pages/auth/ForgottenPassword";
import ResetPasswordbyToken from "./Pages/auth/ResetPasswordbyToken";
import Login from "./Pages/auth/Login";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminRoute from "./route/AdminRoute";
import Profile from "./Pages/user/Profile";
import Orders from "./Pages/user/Orders";
import ManageCategory from "./Pages/admin/ManageCategory";
import Category from "./Pages/admin/Category";
import CreateProduct from "./Pages/admin/CreateProduct";
import Products from "./Pages/admin/Products";
import User from "./Pages/admin/User";
import UpdateProduct from "./Pages/admin/UpdateProduct";
import ProductDetails from "./Pages/ProductDetails";
import SearchProducts from "./Pages/SearchProducts";
import CategoryWiseProduct from "./Pages/CategoryWiseProduct";
import Cart from "./Pages/cart/Cart";
import AdminOrders from "./Pages/admin/AdminOrders";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<Category />} />
          <Route path="admin/category" element={<ManageCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route
            path="admin/update-product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<User />} />
        </Route>
        <Route path="/product-details/:slug" element={<ProductDetails />} />
        <Route path="/Category/:slug" element={<CategoryWiseProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPasswordbyToken />} />
        <Route path="/forgotPassword" element={<ForgottenPassword />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/search" element={<SearchProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Home />} />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
