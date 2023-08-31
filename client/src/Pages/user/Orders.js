import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
const Orders = () => {
  const [order, setOrder] = useState([]);
  const [auth] = useAuth();
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
  const deleteOrder = async (id) => {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/order/delete-order/${id}`,
      { method: "delete", headers: { Authorization: auth?.token } }
    );
    result = await result.json();
    if (result?.success) {
      toast.success(result.message);
      getOrder();
    }
  };
  return (
    <Layout  title={"ComfortZone User Orders"} 
    keywords={"Orders ,Best Orders,Comfort Deals,Free"}
>      <div className="container-fluid">
        <UserMenu />
        <div className="row">
          <div className="col-md-12 col">
            <div className="row text-center">
              <div className="col table-responsive p-1">
                <table className="table table-striped table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th>OrderDate</th>
                      <th>Action</th>
                      <th>Status</th>
                      <th>Customer</th>
                      <th>Products</th>
                      <th>TotalPrice</th>
                    </tr>
                  </thead>
                  <tbody className=" table-hover table-warning">
                    {order?.length > 0 ? (
                      order?.map((o, i) => (
                        <tr key={i}>
                          <td>{date(o.createdAt)}</td>
                          <td>
                            <button
                              onClick={() => deleteOrder(o._id)}
                              className="btn btn-danger px-1 mx-1"
                            >
                              Remove
                            </button>
                          </td>
                          <td>{o.status}</td>
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
                              <tbody className="table-info table-hover">
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
                      ))
                    ) : (
                      <tr>
                        <td>You Have Not Any Order</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
