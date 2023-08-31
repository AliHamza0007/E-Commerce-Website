import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <button
        className="btn btn-primary mb-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        User Panel
      </button>

      <div
        className="offcanvas offcanvas-start  bg-transparent mt-5"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="container-fluid  ">
          <div className="row justify-content-center align-items-center g-2">
            <div
              className="col border-end mt-1 shadow bg-body "
              style={{ height: "80vh" }}
            >
              <div className="offcanvas-header">
                <h1 className="text-center">User Panel</h1>
                <button
                  type="button"
                  className="btn-close m-1 ml-auto"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
                <hr />
              </div>
              <div className="list-group offcanvas-body">
                <div className="list-group">
                  <NavLink
                    to="/dashboard/user/"
                    className="list-group-item  list-group-item-action "
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/dashboard/user/profile"
                    className="list-group-item  list-group-item-action "
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/user/orders"
                    className="list-group-item  list-group-item-action"
                  >
                    Orders
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
