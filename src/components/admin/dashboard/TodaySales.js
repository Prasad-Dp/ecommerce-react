import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalesReportAction } from "../../../redux/slices/reportSlice";
import { baseUrl } from "../../../utils/url";

function TodaySales() {
  const dispatch = useDispatch();

  useEffect(() => {
    const url = `${baseUrl}orders/sales/today`;
    dispatch(getSalesReportAction({ url }));
  }, [dispatch]);
  const handelSales = (value) => {
    if (value === "today") {
      const url = `${baseUrl}orders/sales/today`;
      dispatch(getSalesReportAction({ url }));
    } else {
      const url = `${baseUrl}orders/sales/report`;
      dispatch(getSalesReportAction({ url }));
    }
  };

  const sales = useSelector((state) => state.sales.sales.sales);
  //console.log(sales)
  return (
    <>
      <h3>Sales Report</h3>
      <select name="sales" onChange={(e) => handelSales(e.target.value)}>
        <option value="today">Today</option>
        <option value="total">total</option>
      </select>
      <div className="m-10 grid gap-3 sm:grid-cols-4  mx-auto max-w-screen-lg bg-white">
        <div className="px-4 py-2 shadow-lg  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 rounded-xl bg-green-400 p-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-4 font-medium">Min Sales</p>
          <p className="mt-2 text-xl font-medium">
            Rs.{parseFloat(sales?.[0]?.minimumSales).toFixed(2)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </p>
          {/* <span className="text-xs text-gray-400">+4.9%</span> */}
        </div>

        <div className="px-4 py-2 shadow-lg  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 rounded-xl bg-green-400 p-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-4 font-medium">Avg Sales</p>
          <p className="mt-2 text-xl font-medium">
            Rs.{parseFloat(sales?.[0]?.avrageSales).toFixed(2)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </p>
          {/* <span className="text-xs text-gray-400">+4.9%</span> */}
        </div>

        <div className="px-4 py-2 shadow-lg  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 rounded-xl bg-green-400 p-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-4 font-medium">Maximum sales</p>
          <p className="mt-2 text-xl font-medium">
            Rs.{parseFloat(sales?.[0]?.minimumSales).toFixed(2)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </p>
          {/* <span className="text-xs text-gray-400">+4.9%</span> */}
        </div>

        <div className="px-4 py-2 shadow-lg  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 rounded-xl bg-green-400 p-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-4 font-medium">Total Sales</p>
          <p className="mt-2 text-xl font-medium">
            Rs.{parseFloat(sales?.[0]?.totalSales).toFixed(2)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </p>
          {/* <span className="text-xs text-gray-400">+4.9%</span> */}
        </div>
      </div>
    </>
  );
}

export default TodaySales;
