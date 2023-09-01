import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { NavLink, Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import useCategory from "../../Hooks/useCategory";
import { Modal } from "antd";
import "./Header.css";
import { BsCartPlus, BsSearch } from "react-icons/bs";
const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  const [visible, setVisible] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  //logout handle
  const LogoutHandle = () => {
    if (localStorage.getItem("auth")) {
      toast.success("LogOut Successfully");
      localStorage.removeItem("auth");
      setAuth({ ...auth, user: null, token: "" });
      navigate("/login");
    }
  };
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg shadow bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand h2 text-danger px-3" to="/">
            ConfortZone
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/products" className="nav-link ">
                  Products
                </NavLink>
              </li>

              {auth?.user ? (
                <li>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    } `}
                    onClick={() =>
                      navigate(
                        `/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        } `
                      )
                    }
                    className=" nav-link"
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : (
               ""
              )}
              <li className="nav-item  dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-light"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  {categories?.map((c) => (
                    <div key={c._id}>
                      <li>
                        <NavLink
                          to={`/category/${c.slug}`}
                          className="dropdown-item"
                        >
                          {c.name}
                        </NavLink>
                      </li>
                    </div>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item  dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-light "
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <NavLink
                        to="/login"
                        onClick={() => LogoutHandle()}
                        className="dropdown-item nav-link"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

            <Modal
              onCancel={() => setVisible(false)}
              open={visible}
              footer={null}
            >
              <SearchBar />
            </Modal>
          </div>

          <ul className="navbar-nav ms-auto  d-inline-flex flex-row ">
            <li className="nav-item ">
              <NavLink onClick={() => setVisible(true)} className="nav-link">
                <BsSearch size={21} />
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink to="/cart" className="nav-link  position-relative ">
                <BsCartPlus size={21} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-dark ">
                  {cartItems?.length}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
