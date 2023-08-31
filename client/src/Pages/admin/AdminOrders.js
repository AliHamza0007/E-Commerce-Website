import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [auth] = useAuth();
  const getOrder = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/order/get-allorder`,
      { method: "get", headers: { Authorization: auth?.token } }
    );
    result = await result.json();
    if (result?.success) {
      setOrder(result.order);
      // console.log(result.order);
    }
  };
  const date = (createdAt) => {
    const ReadAbleDate = new Date(createdAt);
    const date = ReadAbleDate.toDateString();
    return date;
  };
  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, []);

  const updateStatus = async (id, value) => {
    let update = { status: value };
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/order/update-orderstatus/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: auth?.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }
    );
    result = await result.json();
    if (result?.success) {
      toast.success(result.message);
      getOrder();
    }
  };
  const searchOrder = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value) {
      let result = await fetch(
        `${process.env.REACT_APP_API}/api/v1/order/search-order/${value}`,
        {
          headers: { Authorization: auth?.token },
        }
      );

      result = await result.json();
      if (result?.success) {
        setOrder(result.order);
      }
    } else {
      getOrder();
    }
  };

  return (
    <Layout title={"Admin Orders Page"}>
      <div className="container-fluid">
        <AdminMenu />
        <div className="row">
          <div className="col-md-12 col text-center">
            <div className="p-2 text-center">
              <input
                type="text"
                placeholder="Search Order"
                onChange={searchOrder}
                className="form-control px-1 text-center"
              />
            </div>
            {order?.length > 0 ? (
              <div className="table-responsive p-1">
                {" "}
                <table className="table table-striped table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th>OrderDate</th>
                      <th>Status</th>
                      <th>Action</th>
                      <th>Customer</th>
                      <th>Products</th>
                      <th>TotalPrice</th>
                    </tr>
                  </thead>
                  <tbody className=" table-hover table-warning">
                    {order?.map((o) => (
                      <tr key={o._id}>
                        <td>{date(o.createdAt)}</td>
                        <td>{o.status}</td>
                        <td>
                          <select
                            className="form-select from-control cursor-pointer"
                            onChange={(e) =>
                              updateStatus(o._id, e.target.value)
                            }
                          >
                            <option value="In Progress">In Progress</option>
                            <option value="Processing">Processing</option>
                            <option value="Out of Stock">Out of Stock</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td>{o.username}</td>
                        <td>
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Size</th>
                                <th scope="col">Color</th>
                                <th scope="col">Quantity</th>
                              </tr>
                            </thead>
                            <tbody className="table-info table-hover text-center align-items-center">
                              {o?.cartItems?.map((p) => (
                                <tr key={p.product}>
                                  <td>
                                    <img
                                      src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p.product}`}
                                      className="img img-fluid img-responsive"
                                      alt={p.name}
                                      width={"120px"}
                                      height={"50px"}
                                    />
                                  </td>
                                  <td>{p.name}</td>
                                  <td>${p.price}</td>
                                  <td>{p.size}</td>
                                  <td>{p.color}</td>
                                  <td>{p.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
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
      </div>
    </Layout>
  );
};

export default AdminOrders;
