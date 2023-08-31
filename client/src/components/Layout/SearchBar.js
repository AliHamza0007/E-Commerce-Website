import React from "react";
import { useSearch } from "../../context/UseSearch";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let searchProducts = await fetch(
        `${process.env.REACT_APP_API}/api/v1/product/search-product/${search.keyword}`
      );
      searchProducts = await searchProducts.json();
      if (searchProducts?.success) {
        setSearch({ ...search, result: searchProducts.searchProducts });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex m-2 p-2" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search Special"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => {
            setSearch({ ...search, keyword: e.target.value });
          }}
        />
      </form>
    </>
  );
};

export default SearchBar;
