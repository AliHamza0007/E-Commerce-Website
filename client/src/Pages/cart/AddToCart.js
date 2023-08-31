import React from "react";
import { addItemToCart } from "../../cartStore/cartActions";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const AddToCart = ({ id }) => {
  const dispatch = useDispatch();
  const addToCart = (id, quantity) => {
    // console.log(id);
    dispatch(addItemToCart(id, quantity));
  };
  return (
    <button className="btn btn-warning ms-1" onClick={() => {addToCart(id, 1)
    toast.success("Item Added To Cart")}}>
      Add To Cart
    </button>
  );
};

export default AddToCart;
