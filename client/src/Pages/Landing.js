import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import useCategory from "../Hooks/useCategory";
import useProduct from "../Hooks/useProduct";
import img1 from ".././assests/1.png";
import img2 from ".././assests/2.png";
import img3 from ".././assests/3.png";
import img4 from ".././assests/img3.jpg";
import img5 from ".././assests/img2.avif";
import img6 from ".././assests/img3.avif";
import img7 from ".././assests/img1.avif";
import babygirl from ".././assests/babygirl.jpg";
import girl from ".././assests/girl.jpg";
import mens from ".././assests/mens.jpg";
import delivery from ".././assests/delivery (2).jpg";
import { toast } from "react-hot-toast";

const Home = () => {
  //   const navigate = useNavigate();

  const categories = useCategory();
  const navigate = useNavigate();
  const products = useProduct();
  useEffect(() => {
    setTimeout(() => {
      toast.success("Welcome To ConfortZone");
    }, 2000);
  }, []);

  return (
    <Layout
      title={"ComfortZone Products"}
      keywords={"Furniture ,Best Furniture,Comfort Furniture,Free"}
      description={
        "Every type bed furniture like beds ands sofas and mattress are available at any time "
      }
    >
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item ">
            <img
              src={img1}
              className="d-block   w-100 "
              alt="ConfortZone Beds"
            />
          </div>
          <div className="carousel-item active">
            <img src={img2} className="d-block w-100 " alt="ConfortZone Beds" />
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block w-100 " alt="ConfortZone Beds" />
          </div>
          <div className="carousel-item">
            <img src={img4} className="d-block w-100 " alt="ConfortZone Beds" />
          </div>
          <div className="carousel-item">
            <img src={img5} className="d-block w-100 " alt="ConfortZone Beds" />
          </div>
          <div className="carousel-item">
            <img src={girl} className="d-block w-100 " alt="ConfortZone Beds" />
          </div>
          <div className="carousel-item ">
            <img
              src={babygirl}
              className="d-block w-100 "
              alt="ConfortZone Beds"
            />
          </div>
          <div className="carousel-item ">
            <img src={img6} className="d-block w-100 " alt="ConfortZone Beds" />
          </div>
          <div className="carousel-item ">
            <img src={img7} className="d-block w-100 " alt="ConfortZone Beds" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container py-3">
        <div className="row">
          <div className="col text-center">
            <h3 className="text-danger">Browse Our Categories</h3>
          </div>
        </div>
        <div className="row py-2">
          <div className="col text-center">
            {categories?.map((c) => (
              <>
                <button className="btn btn-outline-success px-3 m-1">
                  <Link
                    className="nav-link text-danger"
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                </button>
              </>
            ))}
          </div>
        </div>
        <div className="row py-2">
          <div className="col ">
            <h3 className="text-danger">Latests Products</h3>
            {products?.slice(0, 4).map((product) => (
              <Link
                to="/products"
                key={product._id}
                className="d-inline-flex nav-link flex-wrap   p-3 "
              >
                <div className="card border-red">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${product._id}`}
                    className="card-img-top img-fluid img-responsive"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <p className="card-text ">
                      {product.description.substring(0, 20)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div
          onClick={() => navigate("/products")}
          className="row py-3 text-center"
        >
          <h3 className="bg-danger text-white p-3 rounded">
            We supply a huge range of quality bedroom furniture across the UK!
            Shop Now
          </h3>
        </div>
        <div className="row cursor-pointer py-3">
          <div className="col-md-6 border-red  py-2 ">
            <div className="img-fluid img-responsive">
              <img src={mens} className="w-100 " alt="ConfortZone Beds" />
            </div>
            <h5 className="  pt-5 ">
              Need something in a hurry? We have a huge range of beds,mattresses
              and furniture available for delivery to you as quickly as the very
              next day.
            </h5>
          </div>
          <div className="col-md-6 border-red  py-2 ">
            <div className="img-fluid img-responsive">
              <img src={delivery} className=" w-100 " alt="ConfortZone Beds" />
            </div>
            <h5 className=" pt-5  ">
              With many years of experience behind us, our dedicated team know
              how to make our customers happy. Great value, fast communication,
              speedy delivery and top customer service all come as standard.
            </h5>
          </div>
        </div>
        <div
          onClick={() => navigate("/products")}
          className="row py-3 text-center"
        >
          <h3 className="bg-danger text-white p-3 rounded">
            We supply a best quality bedroom furniture across the UK! Shop Now
          </h3>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
