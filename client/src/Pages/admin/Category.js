import React from "react";

const Category = ({ name, setName, SaveCategory }) => {
  return (
    <div className="container text-center mt-4">
      <div className="row py-2">
        <div className="col ">
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control text-center"
              placeholder="Enter Category Name"
            />
            <button
              type="button"
              onClick={(e) => SaveCategory(e)}
              className="btn btn-primary m-3 "
            >
              Save Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
