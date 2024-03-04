import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCouponsListAction,
  deleteCouponAction,
} from "../../../redux/slices/couponSlice";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

function CouponsList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCouponsListAction());
  }, [dispatch]);

  const handelDelete = (id) => {
    dispatch(deleteCouponAction({ id }));
    dispatch(fetchCouponsListAction());
  };

  const coupons = useSelector((state) => state.coupon.coupons.coupon);

  return (
    <>
      <div className="mx-auto max-w-screen-lg px-2 py-2 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">
              Coupons-{`[${coupons?.products?.length}]`}
            </h2>
            <span className="text-xs text-gray-500">List of Coupons</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="ml-10 space-x-8 lg:ml-40">
              <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                  />
                </svg>
                CSV
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-2 py-3">S.No</th>
                  <th className="px-2 py-3">Coupon</th>
                  <th className="px-2 py-3">Created</th>
                  <th className="px-2 py-3">Start-date</th>
                  <th className="px-2 py-3">End-Date</th>
                  <th className="px-2 py-3">created-date</th>
                  <th className="px-2 py-3">Edit</th>
                  <th className="px-2 py-3">Delete</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {coupons?.map((coupon, index) => (
                  <tr key={index}>
                    <td className="border-b border-gray-200 bg-white px-3 py-2 text-sm">
                      <p className="whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-2 py-2 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {/* <img
                          className="h-full w-full rounded-full"
                          src={product?.images[0]}
                          alt=""
                        /> */}
                        </div>
                        <div className="ml-3">
                          <p className="whitespace-no-wrap">{coupon?.coupon}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-2 py-2 text-sm">
                      <p className="whitespace-no-wrap">{coupon?.user}</p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-2 py-2 text-sm">
                      <p className="whitespace-no-wrap">
                        {new Date(coupon?.startDate).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-2 py-2 text-sm">
                      <p className="whitespace-no-wrap">
                        {new Date(coupon?.endDate).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-2 py-2 text-sm">
                      <p className="whitespace-no-wrap">
                        {new Date(coupon?.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-2 py-2 text-sm">
                      <p className="whitespace-no-wrap">
                        <PencilIcon width={20} height={20} />
                      </p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-2 py-2 text-sm">
                      <button
                        onClick={() => handelDelete(coupon?._id)}
                        className="whitespace-no-wrap"
                      >
                        <TrashIcon width={20} height={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              {" "}
              Showing 1 to 5 of 12 Entries{" "}
            </span>
            <div className="mt-2 inline-flex sm:mt-0">
              <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Prev
              </button>
              <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CouponsList;
