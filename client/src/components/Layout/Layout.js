import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="mb-5 pb-5 ">
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "ConfortZone Beds & Sofas",
  description:
    "Every type bed furniture like beds ands sofas and mattress are available at any time ",
  keywords: "beds, sofas, furniture ,mattress ,sleep ,good sleep,Free ,Best Furniture,Comfort Furniture Best Deals ,Products Beds,Beds & Sofas,Mattress,Free,Best",
  author: "Confort Zone By Hamza",
};

export default Layout;
