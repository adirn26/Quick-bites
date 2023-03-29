import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import List from "../pages/list/List";
import Single from "../pages/single/Single";
import New from "../pages/new/New";
import { productInputs, userInputs } from "../formSource";
import AdminHome from "../pages/home/AdminHome";
import Unauthorized from "../components/Unauthorized";
import RequireAuth from "../components/RequireAuth";
import ProductList from "../pages/list/ProductList";
import Payment from "../components/Payment";


const ROLES = {
  'User': 0,
  'Admin': 1
}

const Routers = () => {
  return (
    <Routes>

      <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="/payment" element={<Payment/>}/>

      <Route path="/admin" element={<RequireAuth allowedRoles={ROLES.Admin} />} >
        <Route index element={<AdminHome />} />
        <Route path="login" element={<Login />} />
        <Route path="users">
          <Route index element={<List />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
          <Route
            path="newProduct"
            element={<New inputs={productInputs} title="Add New User" />}
          />
        </Route>
        <Route path="products">
          <Route index element={<ProductList/>} />
          <Route path=":productId" element={<Single/>} />
          <Route
            path="new"
            element={<New inputs={productInputs} title="Add New Product" />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
