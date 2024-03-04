import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";
import { getcartList } from "../../redux/slices/cartSlice";

export default function NavbarComp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");

  const disapatch = useDispatch();
  const admin = localStorage.getItem("admin");
  useEffect(() => {
    disapatch(getcartList());
  }, [disapatch]);

  const cart = useSelector((state) => state.cart.cartItems);
  //console.log(cart)

  return (
    <header className="bg-white border border-black-900 border-b-1 ">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to={"/"} className="-m-1.5 p-1.5">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="w-5 h-5 rounded-full dark:text-gray-900"
              >
                <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
              </svg>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to={`/`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
          <Link
            to={`/product-filter?category=Men`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Men
          </Link>
          <Link
            to={`/product-filter?category=Women`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Women
          </Link>
          <Link
            to={`/product-filter?category=Boys`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Boys
          </Link>
          <Link
            to={`/product-filter?category=Girls`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Girls
          </Link>
          {!token && (
            <>
              <Link
                to={"/register"}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Register
              </Link>
              <Link
                to={"/login"}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Login
              </Link>
            </>
          )}

          <div className="flex items-center">
            <input
              className="border border-black-900 border-2 rounded pl-3 mr-1"
              placeholder="Search product"
              onChange={(e) => setName(e.target.value)}
            />
            <Link
              to={`/product-filter?name=${name}`}
              className="group -m-2 flex items-center p-2"
            >
              <MagnifyingGlassIcon
                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Link>
          </div>
          {admin ? (
            <>
              <div className="ml-4 flow-root lg:ml-6">
                <Link
                  to={"/admin"}
                  className="group -m-2 flex items-center p-2"
                >
                  <BanknotesIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />

                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="ml-4 flow-root lg:ml-6">
                <Link
                  to={"/profile"}
                  className="group -m-2 flex items-center p-2"
                >
                  <UserIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />

                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </>
          )}

          <div className="ml-4 flow-root lg:ml-6">
            <Link to={"/cart"} className="group -m-2 flex items-center p-2">
              <ShoppingBagIcon
                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {cart?.length}
              </span>
              <span className="sr-only">items in cart, view bag</span>
            </Link>
          </div>
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to={"/"} className="-m-1.5 p-1.5">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5 rounded-full dark:text-gray-900"
                >
                  <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                </svg>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to={`/`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to={`/product-filter?category=Men`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Men
                </Link>
                <Link
                  to={`/product-filter?category=Women`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Women
                </Link>
                <Link
                  to={`/product-filter?category=Boys`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Boys
                </Link>
                <Link
                  to={`/product-filter?category=Girls`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Girls
                </Link>
                {!token && (
                  <>
                    <Link
                      to={"/register"}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Register
                    </Link>

                    <Link
                      to={"/login"}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
              <div className="flex items-center">
                <input
                  className="border border-black-900 border-2 rounded pl-3 mr-1"
                  placeholder="Search product"
                  onChange={(e) => setName(e.target.value)}
                />
                <Link
                  to={`/product-filter?name=${name}`}
                  className="group -m-2 flex items-center p-2"
                >
                  <MagnifyingGlassIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              {admin ? (
                <div className="flex lg:ml-6">
                  <Link
                    to={"/admin"}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <BanknotesIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </div>
              ) : (
                <div className="flex lg:ml-6">
                  <Link
                    to={"/profile"}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </div>
              )}

              <div className="ml-1 flow-root lg:ml-6">
                <Link to={"/cart"} className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                    to={"/cart"}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cart?.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
