//import logo from './logo.svg';
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/users/Login";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import { useSelector } from "react-redux";
import NavbarComp from "./components/navbar/NabarComp";
import Register from "./components/users/Register";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AddProduct from "./components/admin/products/AddProduct";
import AddCategory from "./components/admin/category/AddCategory";
import AddBrand from "./components/admin/brand/AddBrand";
import AddColor from "./components/admin/colors/AddColor";
import AllCategories from "./components/customers/AllCategories";
import ProductFiltering from "./components/customers/ProductFiltering";
import ProductDetails from "./components/customers/ProductDetails";
import Cart from "./components/customers/Cart";
import OrderPage from "./components/customers/OrderPage";
import Profile from "./components/profile/Profile";
import MyOrders from "./components/profile/MyOrders";
import GetOrderInfo from "./components/profile/GetOrderInfo";
import Review from "./components/customers/Review";
import ProductsList from "./components/admin/products/ProductsList";
import OrdersList from "./components/admin/orders/OrdersList";
import BrandList from "./components/admin/brand/BrandList";
import ColorsList from "./components/admin/colors/ColorsList";
import CategoryList from "./components/admin/category/CategoryList";
import CustomerList from "./components/admin/CustomerList";
import AddCoupon from "./components/admin/coupons/AddCoupon";
import CouponsList from "./components/admin/coupons/CouponsList";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Footer from "./components/footer/Footer";

function App() {
  const lloading = useSelector((state) => state.users.userAuth.loading);
  const rloading = useSelector((state) => state.users.register.loading);
  const ploading = useSelector((state) => state.products.loading);
  const cloading = useSelector((state) => state.category.loading);
  const coloading = useSelector((state) => state.colors.loading);
  const bloading = useSelector((state) => state.brands.loading);
  const crtloading = useSelector((state) => state.cart.loading);
  const cploading = useSelector((state) => state.coupon.loading);

  //console.log(loading)

  return (
    <>
      <BrowserRouter>
        <NavbarComp />
        <Toaster position="top-center" reverseOrder={false} />
        {lloading ||
        rloading ||
        ploading ||
        cloading ||
        coloading ||
        bloading ||
        crtloading ||
        cploading ? (
          <div className="loading">
            <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
              <circle
                className="pl__ring pl__ring--a"
                cx="120"
                cy="120"
                r="105"
                fill="none"
                stroke="#000"
                strokeWidth="20"
                strokeDasharray="0 660"
                strokeDashoffset="-330"
                strokeLinecap="round"
              ></circle>
              <circle
                className="pl__ring pl__ring--b"
                cx="120"
                cy="120"
                r="35"
                fill="none"
                stroke="#000"
                strokeWidth="20"
                strokeDasharray="0 220"
                strokeDashoffset="-110"
                strokeLinecap="round"
              ></circle>
              <circle
                className="pl__ring pl__ring--c"
                cx="85"
                cy="120"
                r="70"
                fill="none"
                stroke="#000"
                strokeWidth="20"
                strokeDasharray="0 440"
                strokeLinecap="round"
              ></circle>
              <circle
                className="pl__ring pl__ring--d"
                cx="155"
                cy="120"
                r="70"
                fill="none"
                stroke="#000"
                strokeWidth="20"
                strokeDasharray="0 440"
                strokeLinecap="round"
              ></circle>
            </svg>
          </div>
        ) : null}

        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoutes>
                <Login />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoutes>
                <Register />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          >
            <Route
              path="add-product"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="manage-stock"
              element={
                <AdminRoute>
                  <ProductsList />
                </AdminRoute>
              }
            />
            <Route
              path="add-category"
              element={
                <AdminRoute>
                  <AddCategory />
                </AdminRoute>
              }
            />
            <Route
              path="add-brand"
              element={
                <AdminRoute>
                  <AddBrand />
                </AdminRoute>
              }
            />
            <Route
              path="add-color"
              element={
                <AdminRoute>
                  <AddColor />
                </AdminRoute>
              }
            />
            <Route
              path="manage-orders"
              element={
                <AdminRoute>
                  <OrdersList />
                </AdminRoute>
              }
            />
            <Route
              path="manage-brands"
              element={
                <AdminRoute>
                  <BrandList />
                </AdminRoute>
              }
            />
            <Route
              path="manage-colors"
              element={
                <AdminRoute>
                  <ColorsList />
                </AdminRoute>
              }
            />
            <Route
              path="manage-categories"
              element={
                <AdminRoute>
                  <CategoryList />
                </AdminRoute>
              }
            />
            <Route
              path="manage-customers"
              element={
                <AdminRoute>
                  <CustomerList />
                </AdminRoute>
              }
            />
            <Route
              path="add-coupon"
              element={
                <AdminRoute>
                  <AddCoupon />
                </AdminRoute>
              }
            />
            <Route
              path="manage-coupon"
              element={
                <AdminRoute>
                  <CouponsList />
                </AdminRoute>
              }
            />
            <Route
              path=""
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
          </Route>
          <Route path="/allcategories" element={<AllCategories />} />
          <Route path="/product-filter" element={<ProductFiltering />} />
          <Route path="/product-info/:id" element={<ProductDetails />} />
          <Route
            path="/review/:id"
            element={
              <PrivateRoute>
                <Review />
              </PrivateRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          >
            <Route
              path=""
              element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              }
            />
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <GetOrderInfo />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
