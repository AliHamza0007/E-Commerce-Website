import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <button
        className="btn btn-primary mb-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        Admin Panel
      </button>

      <div
        className="offcanvas offcanvas-start bg-transparent mt-5 "
        data-bs-scroll="true"
        data-bs-backdrop="false"
        taiindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="container-fluid  ">
          <div className="row justify-content-center align-items-center ">
            <div
              className=" col border-end mt-1 shadow bg-body  "
              style={{ height: "80vh" }}
            >
              <div className="offcanvas-header">
                <h1 className=" text-center">Admin Panel</h1>
                <button
                  type="button"
                  className="btn-close m-1 ml-auto"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
                <hr />
              </div>
              <div className="list-group offcanvas-body">
                <NavLink
                  to="/dashboard/admin/"
                  className="list-group-item  list-group-item-action "
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/admin/category"
                  className="list-group-item  list-group-item-action "
                >
                  Category
                </NavLink>
                <NavLink
                  to="/dashboard/admin/create-product"
                  className="list-group-item  list-group-item-action"
                >
                  Add Product
                </NavLink>
                <NavLink
                  to="/dashboard/admin/products"
                  className="list-group-item  list-group-item-action"
                >
                  Products
                </NavLink>
                <NavLink
                  to="/dashboard/admin/orders"
                  className="list-group-item  list-group-item-action"
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/dashboard/admin/users"
                  className="list-group-item list-group-item-action "
                >
                  Users
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
