import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Calender from "../admin/DashboardDec/Calender";
import Donut from "../admin/DashboardDec/Donut";
const Dashboard = () => {
  const [auth] = useAuth();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const [pending, setPending] = useState([]);
  const [delivered, setDelivered] = useState([]);
  // for seeing order pending
  const getOrder = async (id) => {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/order/get-order/${id}`,
      { method: "get", headers: { Authorization: auth?.token } }
    );
    result = await result.json();
    if (result?.success) {
      let filterOrder = result.order.filter(
        (o) => o.userId === auth?.user.id || auth?.user._id
      );

      // console.log(filterOrder);
      setOrder(filterOrder);
      setPending(filterOrder.filter((o) => o.status === "pending"));
      setDelivered(filterOrder.filter((f) => f.status === "Delivered"));
    }
  };
  const date = (createdAt) => {
    const ReadAbleDate = new Date(createdAt);
    const date = ReadAbleDate.toDateString();
    return date;
  };
  useEffect(() => {
    const id = auth?.user?.id || auth?.user?._id;
    getOrder(id);
    // eslint-disable-next-line
  }, []);
  return (
    <Layout  title={"ComfortZone User DashBoard"} 
    keywords={"Dashboard ,User Orders,User Details,Free"}
>      <div className="container-fluid ">
        <UserMenu />
        <div className="row  ">
          <div className="col-md-8 col  ">
            <div className=" bg-info m-3   p-2 text-white  ">
              <h1>{auth?.user?.name}</h1>
              <h5>
                Hi {auth?.user?.name} WellCome to our best Platform to purchase
                Some different ComFort from us ,We sell Comfort not products and
                We sell Good Nights with comfort
              </h5>
              <h5>Dear Please View Details</h5>
              <h4>Name {auth?.user?.name}</h4>
              <h4>Email {auth?.user?.email}</h4>
              <h4>Phone {auth?.user?.phone}</h4>
              <h4>Address {auth?.user?.address}</h4>
              <h4>Postal Code {auth?.user?.postalCode}</h4>
              <h4>
                <button
                  className="btn btn-primary px-3"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update
                </button>
              </h4>
            </div>
          </div>
          <div className="col-md-4 pt-4 col">
            <Calender />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row text-center py-2">
              <div className="col-md-6 col ">
                <div className=" p-4 bg-primary text-center text-white rounded">
                  <h4>Pending Orders {pending?.length}</h4>
                </div>
              </div>
              <div className="col-md-6 col ">
                <div className=" p-4  bg-success text-center text-white rounded">
                  <h4>Delivered Orders {delivered?.length}</h4>
                </div>
              </div>
            </div>
            <div className="table-responsive p-1">
              <table className="table table-striped table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th>OrderDate</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>TotalPrice</th>
                  </tr>
                </thead>
                <tbody className=" table-hover table-warning">
                  {order?.length > 0 ? (
                    order?.slice(0, 5).map((o, i) => (
                      <tr key={i}>
                        <td>{date(o.createdAt)}</td>

                        <td>{o.status}</td>
                        <td>{o.username}</td>
                        <td>
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                              </tr>
                            </thead>
                            <tbody className="table-info table-hover">
                              {o?.cartItems?.map((p) => (
                                <tr key={p.product}>
                                  <td>{p.name}</td>
                                  <td>${p.price}</td>
                                  <td>{p.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                        <td>${o.totalPrice}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Sorry Not Record Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4 col p-1">
            <Donut />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
