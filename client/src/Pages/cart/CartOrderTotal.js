import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { clearCart } from "../../cartStore/cartActions";

const CartOrderTotal = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  //handle for confirm order
  const handleOrder = () => {
    let confirm = window.confirm("Please Confirm Order");
    if (confirm) {
      PlaceOrder();
      RemoveCart();
    }
  };

  const PlaceOrder = async () => {
    const OrderDetails = {
      cartItems,
      username: auth?.user?.name,
      userEmail: auth?.user?.email,
      totalPrice,
      userId: auth?.user.id || auth?.user?._id,
      status: "in Process",
    };
    // console.log(OrderDetails);
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/order/create-order`,
      {
        method: "POST",
        headers: {
          Authorization: auth?.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(OrderDetails),
      }
    );
    result = await result.json();
    if (result?.success) {
      toast.success(result?.message);
      setTimeout(() => {
        
        toast.success("Order is In Process");
      }, 2000);

      navigate("/dashboard/user/orders");
    }
  };

  const RemoveCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="row">
      <div className="col text-center">
        <h2>Cart Summary</h2>
        <p> Total || Checkout || Order</p>
        <hr />
      </div>
      <div className="row mb-2">
        <div className="col text-center">
          <h6 className="px-3">
            Subtotal:
            {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)}
            (Units)
          </h6>
          <h3 className="px-1 ">Total: &pound;{totalPrice}</h3>
        </div>
        <div className="row">
          <div className="col text-center align-items-center justify-content-center">
            {auth?.user?.address ? (
              <>
                <p> Address: {auth?.user?.address}</p>
                <p> Postal Code: {auth?.user?.postalCode}</p>
                <button
                  className="btn text-dark btn-outline-warning px-1"
                  onClick={() => {
                    navigate("/dashboard/user/profile");
                  }}
                >
                  Update Address
                </button>
                <div className="my-2">Cash On Delivery Available</div>
                <div className=" my-2">
                  <button
                    onClick={() => handleOrder()}
                    className="btn btn-success px-5 m-1"
                  >
                    Place Order
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-2 pb-5 text-center">
                {auth?.token ? (
                  <button
                    className="btn text-dark btn-outline-warning px-1 mx-1"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update-Address
                  </button>
                ) : (
                  <button
                    className="btn text-dark btn-outline-primary  px-1"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Log-In to CheckOut
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartOrderTotal;
