import { ADD_TO_CART, CLEAR_CART_ITEM, REMOVE_ITEM_CART } from "./cartConstant";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  // console.log(id);
  let data = await fetch(
    `${process.env.REACT_APP_API}/api/v1/product/product/${id}`,
    { method: "GET" }
  );
  data = await data.json();
  // console.log(data.product.name);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      size: data.product.size,
      color: data.product.color,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => async (dispatch, getState) => {
  dispatch({
    type: CLEAR_CART_ITEM,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
