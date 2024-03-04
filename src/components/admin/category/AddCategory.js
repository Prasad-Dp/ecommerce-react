import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategoryAction } from "../../../redux/slices/categorySlice";

function AddCategory() {
  const dispatch = useDispatch();

  const [category, setCategory] = useState({});

  const handelChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "image") {
      setCategory({
        ...category,
        [name]: e.target.files[0],
      });
    } else {
      setCategory({
        ...category,
        [name]: value,
      });
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    //console.log(category)
    dispatch(createCategoryAction(category));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-20 h-full light w-full">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Add Category
          </h2>

          <form className="flex flex-col" onSubmit={handelSubmit}>
            <input
              placeholder="Enter Category name"
              className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="name"
              onChange={handelChange}
            />
            <input
              placeholder="photos"
              className="bg-white-700 text-black-200 border-0 rounded-md p-2 mb-4 focus:bg-white-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="file"
              name="image"
              onChange={handelChange}
            />

            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
              onClick={handelSubmit}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
