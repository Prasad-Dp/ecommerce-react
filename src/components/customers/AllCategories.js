import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategoriesAction } from "../../redux/slices/categorySlice";
import { Link } from "react-router-dom";
function AllCategories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const categories = useSelector((state) => state.category.categories.category);
  const total = categories?.length;

  return (
    <>
      <div className="bg-gray-100">
        <h3 className="py-2 text-center">Total Categories[{total}]</h3>
        <h6 className="py-2 text-center">
          find the best products based on our categories
        </h6>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-2 sm:py-24 lg:max-w-none lg:py-32">
            <div className="mt-2 space-y-12 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:space-y-0">
              {categories?.map((callout) => (
                <Link
                  key={callout?._id}
                  to={`/product-filter?category=${callout?.name}`}
                >
                  <div key={callout.name} className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <img
                        src={callout.image}
                        alt={callout.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <a href={callout.href}>
                        <span className="absolute inset-0" />
                        {callout.name}
                      </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {callout.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllCategories;
