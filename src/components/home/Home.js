import React from "react";
import { Link } from "react-router-dom";
import CategoryProducts from "./CategoryProducts";
import TrendingProducts from "./TrendingProducts";
export default function Home() {
  // const user=useSelector((state)=>state.users.userAuth)
  // console.log(user)
  return (
    <>
      <div className="mx-auto  overflow-hidden rounded-xl mt-2 border shadow-sm md:pl-8 max-w-2xl px-2 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80">
          <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
            <h2 className="text-xl font-bold  text-gray-900 md:text-2xl lg:text-4xl">
              Discover the Best <br /> Deals on Our <br />
              Website
            </h2>

            <p className="mt-4 mb-8 max-w-md text-gray-500">
              Shop now and save big on our wide selection of products.
            </p>
            <Link
              href="#"
              className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
            >
              <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                {" "}
                Shop now{" "}
              </span>
              <svg
                className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
          <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
            <img
              className="h-full w-full object-cover"
              src={
                "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
              }
              alt="not found"
            />
          </div>
        </div>
      </div>

      <CategoryProducts />

      <TrendingProducts />
    </>
  );
}
