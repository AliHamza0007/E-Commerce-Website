import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../cartStore/cartActions";
import CartOrderTotal from "./CartOrderTotal";
const Cart = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [count, setCount] = React.useState(5);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  //remove cart_item form
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
    toast.error("Item Removed");
  };
  //increase quantity of productItem
  const increaseQty = (id, quantity) => {
    const newQty = quantity + 1;

    dispatch(addItemToCart(id, newQty));
  };

  //decrease quantity of productItem
  const decreaseQty = (id, quantity) => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      dispatch(addItemToCart(id, newQty));
    }
  };

  //redirecting when no item in cart
  if (cartItems?.length === 0) {
    setTimeout(() => {
      navigate(`/products`);
    }, 5000);
  }
  React.useEffect(() => {
    if (cartItems?.length === 0) {
      setTimeout(() => {
        setCount((pre) => pre - 1);
      }, 1000);
    }
    //eslint-disable-next-line
  }, [count]);
  return (
    <Layout>
      <div className="container-fluid pb-5  pt-3">
        <div className="row">
          <div className="col text-center  ">
            <h2>Hello {auth?.token && auth?.user?.name}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col text-center h4">
            {cartItems?.length > 0 ? (
              `You have ${cartItems?.length} items in cart ${
                auth?.token ? "" : "Please Log-In to CheckOut"
              }`
            ) : (
              <>
                <h5>Your Card Is Empty</h5>
                <h5>Redirecting to you in {count} second</h5>
              </>
            )}
          </div>
        </div>
        <div className=" py-2 btn  text-center m-auto ">
          <button
            onClick={() => navigate(`/category/mattress`)}
            type="button"
            className="btn  h1 btn-primary px-4 mx-2  "
          >
            Add Mattress
          </button>
          <button
            onClick={() => navigate(`/category/sofa`)}
            type="button"
            className="btn  h1 btn-warning px-4 mx-2  "
          >
            Add Sofa
          </button>
        </div>
        <div className="row">
          {cartItems?.length > 0 ? (
            <>
              <div className="col-md-8 text-center">
                {auth?.token
                  ? cartItems?.map((p) => (
                      <div
                        key={p.product}
                        className="row m-1 border align-items-center justify-content-center"
                      >
                        <div className="col-md-2 ">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p.product}`}
                            className="img img-fluid img-responsive"
                            alt={p.name}
                            // width={"120px"}
                            // height={"50px"}
                            width=""
                          />
                        </div>
                        <div className="col-md-4 py-1">
                          <p className="h4">{p.name}</p>
                          <p>Size:{p.size}</p>
                          <p>Color:{p.color}</p>
                        </div>
                        <div className="col-md-2 ">
                          <p className="p-1 text-success mx-1">
                            &pound;{p.price}.00
                          </p>
                        </div>

                        <div className="col-lg-2 ">
                          <div className=" d-inline">
                            <span
                              className="btn  p-2 btn-outline-primary"
                              onClick={() => decreaseQty(p.product, p.quantity)}
                            >
                              -
                            </span>

                            <span className="p-1"> {p.quantity}</span>

                            <span
                              className="btn  p-2 btn-outline-primary"
                              onClick={() => increaseQty(p.product, p.quantity)}
                            >
                              +
                            </span>
                          </div>
                        </div>

                        <div className="col-md-2 ">
                          <button
                            className="btn btn-danger px-1 m-1"
                            onClick={() => removeCartItemHandler(p.product)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  : null}
              </div>

              <div className="col-md-4 ">
                <CartOrderTotal />
              </div>
            </>
          ) : (
            <>
              <div className="col mt-2 pb-5 text-center">
                <div
                  className="text-center btn btn-outline-danger m-1 px-2"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/products");
                  }}
                >
                  Hi buddy Fill Cart
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
