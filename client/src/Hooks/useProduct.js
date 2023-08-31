import { useEffect, useState } from "react";

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/product/get-product`,
      { method: "GET" }
    );

    result = await result.json();
    if (result?.success) {
      setProducts(result.getProduct);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return products;
};

export default useProduct;
