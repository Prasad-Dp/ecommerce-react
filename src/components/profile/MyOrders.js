import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserAction } from "../../redux/slices/UserSlice";
import ReactStars from "react-rating-stars-component";

function MyOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  const userInfo = useSelector((state) => state.users.userAuth.userInfo.user);
  //console.log(userInfo?.orders);
  return (
    <>
      <h1>Orders</h1>
      {userInfo?.orders?.map((order, index) => (
        <div key={index} className="m-5">
          <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
            <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
              <Link
                to={`${order?._id}`}
                className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
              >
                {" "}
                Order No: {order?.orderNumber}
              </Link>

              {order?.orderItems.map((item) => (
                <div
                  key={item?._id}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <Link to={`/product-info/${item?._id}`}>
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={item?.image}
                      alt=""
                    />
                  </Link>
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item?.name}</span>
                    <span className="float-right text-gray-400">
                      <ReactStars count={5} size={24} activeColor="#ffd700" />{" "}
                      <Link to={`/review/${item?._id}`}>write review</Link>{" "}
                    </span>
                  </div>
                </div>
              ))}

              <div className="mt-2 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                <div className="">
                  Payment Status:
                  <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                    {" "}
                    {order?.paymentStatus}
                  </span>
                </div>
                <div className="">
                  Order Status:
                  <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                    {order?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MyOrders;
