import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  fetchColorsAction,
  deleteColorAction,
} from "../../../redux/slices/colorSlice";
function ColorsList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  const handelDelete = (id) => {
    dispatch(deleteColorAction({ id }));
    dispatch(fetchColorsAction());
  };

  const colors = useSelector((state) => state.colors.colors.color);

  //console.log(colors)
  return (
    <div className="mx-auto max-w-screen-lg px-2 py-2 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">
            Colors-{`[${colors?.length}]`}
          </h2>
          <span className="text-xs text-gray-500">List of Colors</span>
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
                <th className="px-5 py-3">S.No</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">created At</th>
                <th className="px-5 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {colors?.map((color, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                    <p className="whitespace-no-wrap">{index + 1}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                    <div className="flex items-center">
                      {/* <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-full w-full rounded-full"
                        src={order?.images[0]}
                        alt=""
                      />
                    </div> */}
                      <div className="ml-3">
                        <p className="whitespace-no-wrap">{color?.color}</p>
                      </div>
                    </div>
                  </td>

                  <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                    <p className="whitespace-no-wrap">
                      {new Date(color?.createdAt).toLocaleDateString()}
                    </p>
                  </td>

                  <td className="border-b border-gray-200 bg-white px-5 py-2 text-sm">
                    <button
                      onClick={() => handelDelete(color?._id)}
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
  );
}

export default ColorsList;
