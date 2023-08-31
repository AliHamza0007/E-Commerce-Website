import React, { useEffect } from "react";
const useCategory = () => {
  const [categories, setCategories] = React.useState([]);
  async function getCategory() {
    let result = await fetch(
      `${process.env.REACT_APP_API}/api/v1/category/get-category`,
      { method: "GET" }
    );
    result = await result.json();
    if (result?.success) {
      setCategories(result?.getCategory);
      // toast.success(result.message);
    }
    // console.log(category);
  }
  useEffect(() => {
    getCategory();
  }, []);
  return categories;
};

export default useCategory;
