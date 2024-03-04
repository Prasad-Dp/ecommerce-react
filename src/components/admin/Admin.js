import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../redux/slices/UserSlice";
export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  const userInfo = useSelector((state) => state.users.userAuth.userInfo.user);
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;1,600&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n  :root {\n    font-family: 'Source Sans Pro';\n  }\n  main#dashboard-main::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n  }\n  main#dashboard-main::-webkit-scrollbar-thumb {\n    border-radius: 9999px;\n    background-color: rgb(156 163 175 / 0.75);\n  }\n  main#dashboard-main::-webkit-scrollbar-track {\n    box-shadow: inset 0 0 5px rgb(156 163 175 / 0.75);\n    border-radius: 10px;\n  }\n",
          }}
        />
        <div className="bg-slate-200 flex h-screen border-1">
          <aside className="fixed z-50 md:relative">
            {/* Sidebar */}
            <input type="checkbox" className="peer hidden" id="sidebar-open" />
            <label
              className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-white peer-checked:text-balck absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
              htmlFor="sidebar-open"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <nav
              aria-label="Sidebar Navigation"
              className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-white text-balck transition-all md:h-screen md:w-64 lg:w-72"
            >
              <div className="bg-white mt-1 py-3 pl-10 md:mt-10">
                <span className="">
                  <span className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 align-bottom text-2xl font-bold">
                    U
                  </span>
                  <span className="text-xl">rbane</span>
                </span>
              </div>
              <ul className="mt-2 space-y-3 flex-row overflow-x-hidden border-1  md:mt-20">
                <li className="relative">
                  <Link
                    to={""}
                    className="focus:bg-gray-200 hover:bg-gray-300 flex w-full space-x-2 rounded-md px-10 py-2 no-underline text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg> */}
                    </span>
                    <span className="">Dashboard</span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    to={"manage-orders"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full space-x-2  rounded-md px-10 py-2  no-underline  text-balck focus:outline-none"
                  >
                    {/* <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>{" "}
              </span> */}

                    <span className="">Manage orders</span>
                  </Link>

                  {/* <svg
              className="text-slate-200 absolute -right-1 -top-1/2 z-10 hidden h-32 w-8 md:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="399.349 57.696 100.163 402.081"
              width="1em"
              height="4em"
            >
              <path
                fill="currentColor"
                d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z"
              />
            </svg> */}
                </li>
                <li className="relative">
                  <Link
                    to={"manage-customers"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full space-x-2  rounded-md px-10 py-2  no-underline  text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg> */}
                    </span>
                    <span className="">Customers</span>
                  </Link>
                </li>
                Products
                <li className="relative">
                  <Link
                    to={"add-product"}
                    className="focus:bg-gray-200 hover:bg-gray-200 no-underline flex w-full space-x-2 rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span className="text-2xl">
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="currentColor"
                    d="M32 15h-1V9a1 1 0 0 0-1-1H6a1 1 0 0 1-1-.82v-.36A1 1 0 0 1 6 6h23.58a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3a3.08 3.08 0 0 0 0 .36v20.57A4.1 4.1 0 0 0 7.13 32H30a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 15H7.13A2.11 2.11 0 0 1 5 27.93V9.88A3.11 3.11 0 0 0 6 10h23v5h-7a5 5 0 0 0 0 10h7Zm2-7h-9a3 3 0 0 1 0-6h9Z"
                    className="clr-i-outline clr-i-outline-path-1"
                  />
                  <circle
                    cx="23.01"
                    cy={20}
                    r="1.5"
                    fill="currentColor"
                    className="clr-i-outline clr-i-outline-path-2"
                  />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg> */}
                    </span>
                    <span className="">Add Products</span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    to={"manage-stock"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full space-x-2 no-underline rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg> */}
                    </span>
                    <span className="">Manage Stock</span>
                  </Link>
                </li>
                Coupons
                <li className="relative">
                  <Link
                    to={"add-coupon"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full no-underline space-x-2 rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                    </span>
                    <span className="">Add Coupons</span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    to={"manage-coupon"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full no-underline space-x-2 rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                    </span>
                    <span className="">Manage Coupons</span>
                  </Link>
                </li>
                Category
                <li className="relative">
                  <Link
                    to={"add-category"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full no-underline space-x-2 rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                    </span>
                    <span className="">Add Category</span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    to={"manage-categories"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full space-x-2 no-underline rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                    </span>
                    <span className="">Manage Category</span>
                  </Link>
                </li>
                Colors
                <li className="relative">
                  <Link
                    to={"add-color"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full no-underline space-x-2 rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                    </span>
                    <span className="">Add Colors</span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    to={"manage-colors"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full no-underline space-x-2 rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                    </span>
                    <span className="">All Colors</span>
                  </Link>
                </li>
                Brand
                <li className="relative">
                  <Link
                    to={"add-brand"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full no-underline space-x-2 rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                    </span>
                    <span className="">Add Brand</span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    to={"manage-brands"}
                    className="focus:bg-gray-200 hover:bg-gray-200 flex w-full no-underline space-x-2 rounded-md px-10 py-2 text-balck focus:outline-none"
                  >
                    <span>
                      {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                    </span>
                    <span className="">All Brands</span>
                  </Link>
                </li>
              </ul>
              <div className="my-2 mt-auto ml-10 flex cursor-pointer">
                <div className="ml-3">
                  <h3 className="font-medium">{userInfo?.name}</h3>
                  <h6 className="font-medium">{userInfo?.email}</h6>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-gray-700 pt-2 pb-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
                  >
                    <span className="text-gray-600">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </span>
                    <button onClick={logout}>Logout</button>
                  </a>
                  <br />
                  <br />{" "}
                </div>
              </div>
            </nav>
          </aside>
          {/* /Sidebar */}
          <div className="flex h-full w-full flex-col">
            {/* Navbar */}
            {/* <header className="relative flex flex-col items-center bg-white px-4 py-2 shadow sm:flex-row md:h-20">
        <div className="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
          <div className="relative ml-10 flex items-center justify-between rounded-md sm:ml-auto">
            <svg
              className="absolute left-2 block h-5 w-5 text-balck"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx={11} cy={11} r={8} className="" />
              <line x1={21} y1={21} x2="16.65" y2="16.65" className="" />
            </svg>
            <input
              type="name"
              name="search"
              className="h-12 w-full rounded-md border border-gray-100 bg-gray-100 py-2 pr-4 pl-12 shadow-sm outline-none focus:border-blue-500"
              placeholder="Search for anything"
            />
          </div>
          <ul className="mx-auto mt-4 flex space-x-6 sm:mx-5 sm:mt-0">
            <li className="">
              <Link className="flex h-8 w-8 items-center justify-center rounded-xl border text-balck hover:text-black hover:shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </li>
            <li className="">
              <Link className="flex h-8 w-8 items-center justify-center rounded-xl border text-balck hover:text-black hover:shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </Link>
            </li>
            <li className="">
              <Link className="flex h-8 w-8 items-center justify-center rounded-xl border text-balck hover:text-black hover:shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </header> */}
            {/* /Navbar */}
            {/* Main */}
            <div className="h-full overflow-hidden pl-10">
              <main
                id="dashboard-main"
                className="h-[calc(100vh-10rem)] overflow-auto px-4 py-10"
              >
                <Outlet />
              </main>
            </div>
            {/* /Main */}
          </div>
        </div>
      </>
    </>
  );
}
