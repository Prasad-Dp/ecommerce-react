import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categorySlice";
import { Link } from "react-router-dom";
function CategoryProducts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const categories = useSelector((state) => state.category.categories.category);
  //console.log(categories)
  const categoriesslice = categories?.slice(0, 4);
  return (
    <>
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-3 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <div className="mt-8 text-sm">
              <Link
                to={"/allcategories"}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Show more
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
            <div className="mt-6 space-y-12 lg:grid sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
              {categoriesslice?.map((callout) => (
                <div key={callout._id} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.image}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link to={`/product-filter?category=${callout.name}`}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {callout.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryProducts;
