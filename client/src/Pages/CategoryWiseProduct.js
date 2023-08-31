import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import AddToCart from "./cart/AddToCart";

const CategoryWiseProduct = () => {
  const [products, setProducts] = useState([]);
  // const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const categoryWiseProduct = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/product/category-wiseproduct/${params.slug}`,
      { method: "GET" }
    );
    result = await result.json();
    if (result?.success) {
      setProducts(result.result);
      // setCategory(result.category);
    }
  };
  useEffect(() => {
    categoryWiseProduct();
    //eslint-disable-next-line
  }, [params.slug]);
  return (
    <Layout title={"Products Category Wise"} 
    keywords={"Category ,Product Category,Comfort Furniture,Free"}>
      <div className="container pb-5">
        <div className="row my-1 ">
          <div className=" col h4 text-center align-items-center ">
            {products.length ? `${products.length}` : "0"} Products
          </div>
        </div>
        <div className="row ">
          <div className=" col  text-center ">
            {products.length > 0 ? (
              products.map((p) => (
                <div key={p._id} className="d-inline-flex flex-wrap   p-2 ">
                  <div className="card  ">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`}
                      className="card-img-top img-fluid img-responsive"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h6 className="card-title ">{p.name}</h6>
                      <p className="card-text ">
                        {p.description.substring(0, 20)}
                      </p>

                      <p className="card-text text-success h5 "> &pound;{p.price}</p>
                      <button
                        onClick={() => navigate(`/product-details/${p._id}`)}
                        className="btn btn-primary ms-1"
                      >
                        Details
                      </button>
                      <AddToCart id={p._id} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="d-flex flex-column justify-content-center  align-items-center"
                style={{ height: "60vh" }}
              >
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryWiseProduct;
