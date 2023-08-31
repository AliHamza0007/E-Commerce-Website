import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/product/get-product`,
      { method: "GET" }
    );

    result = await result.json();
    if (result?.success) {
      setProducts(result?.getProduct);
    }
  };
  useEffect(() => {
    getProducts();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout title={"Admin Products"}>
      <div className="container-fluid   pb-5">
        <AdminMenu />
        <div className="row text-center">
          <div className="col-md-12 col p-2 ">
            {products?.length > 0 ? (
              products?.map((p) => (
                <Link
                  to={`/dashboard/admin/update-product/${p._id}`}
                  key={p._id}
                  className="d-inline-flex flex-row text-decoration-none text-light  m-0 p-0 "
                >
                  <div className="card m-2  ">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`}
                      className="card-img-top img-fluid img-responsive"
                      alt={p.name}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title ">{p.name}</h5>
                      <p className="card-text text-success  h5 ">
                        &pound; {p.price}
                      </p>
                      <p className="card-text ">Size: {p.size}</p>
                      <p className="card-text ">
                        Description: {p.description.substring(0, 10)}
                      </p>
                    </div>
                  </div>
                </Link>
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

export default Products;
