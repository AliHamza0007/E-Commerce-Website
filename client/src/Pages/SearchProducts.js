import React from "react";
import { useSearch } from "../context/UseSearch";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import AddToCart from "./cart/AddToCart";

const SearchProducts = () => {
  const navigate = useNavigate();
  const [search] = useSearch();
  return (
    <Layout title={"Search Result"}
    keywords={"Search,Search Products, Free,ConfortZone"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>

          <h6>
            {search?.result.length < 1
              ? "No Product Founds"
              : `Found : ${search?.result?.length} Products`}
          </h6>
        </div>

        <div className="row my-3 ">
          <div className=" col text-center">
            {search?.result?.length > 0 ? (
              search?.result?.map((p) => (
                <div key={p._id} className="d-inline-flex flex-wrap mx-3">
                  <div className="card ">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`}
                      className="card-img-top img-fluid img-responsive"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h6 className="card-title  ">{p.name}</h6>
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
                className="d-flex flex-column   align-items-center"
                style={{ height: "40vh" }}
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

export default SearchProducts;
