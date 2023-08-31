import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
//***********************************************88All icon nwe used in our project
import { RxDoubleArrowRight } from "react-icons/rx";
import { BiCategory } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaJediOrder } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
// *******************************icons immport ends
import useCategory from "../../Hooks/useCategory";
import useProduct from "../../Hooks/useProduct";

//import for Charts used in admin dashboard
import Donut from "./DashboardDec/Donut";
import ChartData from "./DashboardDec/Chart";
import Calender from "./DashboardDec/Calender";

const AdminDashboard = () => {
  const product = useProduct();
  const category = useCategory();
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pending, setPending] = useState([]);
  const [delivered, setDelivered] = useState([]);

  //getting users for display in Dashboard
  const getUsers = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/auth/get-users`,
      { method: "GET", headers: { Authorization: auth?.token } }
    );
    result = await result.json();
    if (result?.success) setUsers(result.result);
  };
  //getting orders for display in Dashboard

  const getOrders = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/order/get-allorder`,
      { method: "get", headers: { Authorization: auth?.token } }
    );
    result = await result.json();
    if (result?.success) {
      setOrders(result.order);
      setPending(result.order.filter((o) => o.status === "pending"));
      setDelivered(result.order.filter((f) => f.status === "Delivered"));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getUsers();
      getOrders();
    }, 1500);

    // eslint-disable-next-line
  }, []);

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid  bg-light pb-5">
        <AdminMenu />
        {/* ******************************First row start */}

        <div className="row ">
          <div className="col-md-9 col-12 text-center">
            {/* //card of category */}
            <div className="row text-white">
              <div className="col-xl-3 col-sm-6 ">
                <div className="card  p-2 m-2 bg-info text-center text-white rounded">
                  <div className="card-body">
                    <div className="card-text">
                      <div className="row ">
                        <div className="col-sm-10">
                          <span>
                            <h3>Categories</h3>
                          </span>
                        </div>
                        <div className="col-sm-2 text-end">
                          <BiCategory size={23} />
                        </div>
                      </div>

                      <h4>{category?.length}</h4>
                    </div>
                  </div>
                  <Link
                    className="card-footer nav-link "
                    to="/dashboard/admin/category"
                  >
                    <div className="row text-dark">
                      <div className="col-sm-6">
                        <span>View Details</span>
                      </div>
                      <div className="col-sm-6 text-end">
                        <RxDoubleArrowRight size={21} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* product card */}
              <div className="col-xl-3 col-sm-6 ">
                <div className="card  p-2 m-2 bg-primary text-center text-white rounded">
                  <div className="card-body">
                    <div className="card-text">
                      <div className="row">
                        <div className="col-sm-10">
                          <span>
                            <h3>Products</h3>
                          </span>
                        </div>
                        <div className="col-sm-2 text-end">
                          <BsCartCheck size={23} />
                        </div>
                      </div>

                      <h4>{product?.length}</h4>
                    </div>
                  </div>
                  <Link
                    className="card-footer nav-link  "
                    to="/dashboard/admin/products"
                  >
                    <div className="row text-dark">
                      <div className="col-sm-6">
                        <span>View Details</span>
                      </div>
                      <div className="col-sm-6 text-end">
                        <RxDoubleArrowRight size={21} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 ">
                <div className="card  p-2 m-2 bg-warning text-center text-white rounded">
                  <div className="card-body">
                    <div className="card-text">
                      <div className="row ">
                        <div className="col-sm-10">
                          <span>
                            <h3>Users</h3>
                          </span>
                        </div>
                        <div className="col-sm-2 text-end">
                          <FiUsers size={23} />
                        </div>
                      </div>
                      <h4>{users?.length}</h4>
                    </div>
                  </div>
                  <Link
                    className="card-footer nav-link "
                    to="/dashboard/admin/users"
                  >
                    <div className="row  text-dark">
                      <div className="col-sm-6">
                        <span>View Details</span>
                      </div>
                      <div className="col-sm-6 text-end">
                        <RxDoubleArrowRight size={21} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6">
                <div className="card  p-2 m-2 bg-danger text-center text-white rounded">
                  <div className="card-body">
                    <div className="card-tex">
                      <div className="row ">
                        <div className="col-sm-10">
                          <span>
                            <h3>Orders</h3>
                          </span>
                        </div>
                        <div className="col-sm-2 text-end">
                          <FaJediOrder size={23} />
                        </div>
                      </div>
                      <h4>{orders?.length}</h4>
                    </div>
                  </div>
                  <Link
                    className="card-footer nav-link  "
                    to="/dashboard/admin/orders"
                  >
                    <div className="row text-dark">
                      <div className="col-sm-6">
                        <span>View Details</span>
                      </div>
                      <div className="col-sm-6 text-end">
                        <RxDoubleArrowRight size={21} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-6 col ">
                <div className=" py-4 bg-primary text-center text-white rounded">
                  <h4>Pending Orders {pending?.length}</h4>
                </div>
              </div>
              <div className="col-md-6 col ">
                <div className=" py-4  bg-success text-center text-white rounded">
                  <h4>Deleiverd Orders {delivered?.length}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* //***************************************************88second portion of first row include calener */}
          <div className="col-md-3 col-12 p-1">
            <Donut />
          </div>
        </div>
        {/* *****************************************************first row end */}
        {/* *************************************************second row start */}
        <div className="row py-3 text-center">
          <div className="col-md-6 p-1 col-12">
            <ChartData />
          </div>
          <div className="col-md-6 col-12 ">
            <h5 className="h1 bg-danger text-white text-center">
              Recent Orders
            </h5>

            {pending?.length > 0 ? (
              <div className="table-responsive p-1">
                <table className="table table-striped table-dark table-hover table-bordered">
                  <thead className="thead">
                    <tr>
                      <th>OrderDate</th>
                      <th>Status</th>
                      <th>Customer</th>
                      <th>TotalPrice</th>
                    </tr>
                  </thead>
                  <tbody className=" tbody">
                    {pending?.slice(0, 5).map((o) => (
                      <tr key={o._id}>
                        <td>{o.createdAt}</td>
                        <td>{o.status}</td>
                        <td>{o.username}</td>
                        <td>${o.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-2">
                <h1 className="h1 px-5"> Sorry Not Found </h1>
              </div>
            )}
          </div>
        </div>
        {/* *************************************************second row end */}
        {/* *************************************************Third row start */}
        <div className="row py-2 ">
          <div className="col-md-8 col-12">
            <div className="row py-4">
              <h5 className="h1 bg-success text-white text-center">
                Recent Users
              </h5>

              <div className=" col table-responsive">
                {users?.length > 0 ? (
                  <div className="table-responsive p-1">
                    <table className=" table  table-light table-bordered border-primary table-striped">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>phone</th>
                          <th>Address</th>
                          <th>Postal Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.slice(0, 5).map((user, i) => (
                          <tr key={i}>
                            <td>{user.createdAt}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.postalCode}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-center mt-5 h1 ">Users Not Found</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 my-3 p-1 text-center">
            <Calender />
          </div>
        </div>
        {/* *************************************************Third row end */}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
