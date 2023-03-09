import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  loginStatus?: boolean;
  username: string;
}

const Navbar = (props: NavbarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState<boolean>(false);
  return (
    <>
      <main className="">
        <nav className="border-gray-200 w-full rounded bg-white px-2 py-2.5 dark:bg-prussian-blue sm:px-4">
          <div className="container mx-auto flex w-9/12 flex-wrap items-center justify-between">
            <Link href="#" className="mt-2.5 flex self-start">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 self-center sm:h-9"
                alt="X' Tech Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Frizzy
              </span>
            </Link>
            <div className="flex self-start sm:ml-12 sm:mt-2.5 md:order-1">
              {/*phone size*/}
              <button
                type="button"
                onClick={() => setOpen(!open)}
                data-collapse-toggle="navbar-search"
                aria-controls="navbar-search"
                aria-expanded="false"
                className="mr-1 rounded-lg p-2.5 text-sm text-gray hover:bg-gray focus:outline-none focus:ring-4 focus:ring-gray dark:text-gray dark:hover:bg-gray dark:focus:ring-gray md:hidden"
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {/*pc size*/}
              <div className="relative hidden md:block">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="text-gray-500 h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="border-gray-300 focus:ring-blue-500 block w-full rounded-lg border bg-gray p-2 pl-10 text-sm text-gray focus:border-blue dark:border-gray dark:bg-gray dark:text-white dark:placeholder-gray dark:focus:border-blue dark:focus:ring-blue"
                  placeholder="Search..."
                />
              </div>
              {/*phone size*/}
              <button
                data-bs-toggle="collapse"
                data-bs-target="#navbar-collapse"
                type="button"
                className="text-gray-500 hover:bg-gray-100 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 inline-flex items-center rounded-lg p-2 text-sm focus:outline-none focus:ring-2 md:hidden"
                aria-controls="navbar-search"
                aria-expanded="false"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {/*pc size*/}
            <div
              className={`w-full items-center justify-between md:order-2 md:flex md:w-auto ${
                open ? "block" : "hidden"
              }`}
              id="navbar-collapse"
            >
              <div className="relative mt-3 md:hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="text-gray-500 h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 block w-full rounded-lg border p-2 pl-10 text-sm dark:text-white"
                  placeholder="Search..."
                />
              </div>
              {props.loginStatus ? (
                <ul className="mt-4 flex flex-col rounded-lg border border-gray bg-gray p-4 dark:border-gray dark:bg-gray md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray">
                  <li>
                    <Link
                      href="#"
                      className=" md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent flex items-center justify-between rounded py-2 pl-3 pr-4 text-gray hover:bg-gray dark:border-gray dark:text-gray dark:hover:bg-gray dark:hover:text-white md:p-0 md:dark:hover:text-white"
                      aria-current="page"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="ml-2">Obavijesti</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      className=" text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent flex items-center justify-between rounded py-2 pl-3 pr-4 dark:hover:text-white sm:mr-8 md:p-0 md:dark:hover:text-white"
                      aria-current="page"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2">Narudžbe</span>
                    </Link>
                  </li>

                  <li>
                    <button
                      id="dropdownNavbarLink"
                      data-dropdown-toggle="dropdownNavbar"
                      onClick={() => {
                        setProfileDropdownOpen(!profileDropdownOpen);
                      }}
                      className="text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent flex w-full items-center justify-between rounded py-2 pl-3 pr-4 font-medium dark:hover:text-white dark:focus:text-white sm:ml-8 md:w-auto md:border-0 md:p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2">{props.username}</span>{" "}
                      <svg
                        className="ml-1 h-5 w-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id="dropdownNavbar"
                      className={`z-10 ${
                        profileDropdownOpen ? "block" : "hidden"
                      } w-22 divide-gray-100 dark:divide-gray-600 dark:bg-gray-700 mt-2 divide-y rounded-lg bg-white font-normal shadow`}
                    >
                      <ul
                        className="text-gray-700 dark:text-gray-400 py-2 text-sm"
                        aria-labelledby="dropdownLargeButton"
                      >
                        <li>
                          <Link
                            href="#"
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                          >
                            Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                          >
                            Earnings
                          </Link>
                        </li>
                      </ul>
                      <div className="py-1">
                        <Link
                          href="#"
                          className="text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 block px-4 py-2 text-sm dark:hover:text-white"
                        >
                          Sign out
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="mt-4 flex flex-col rounded-lg border border-gray bg-gray p-4 dark:border-gray dark:bg-gray md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray">
                  <li>
                    <Link
                      href="/login"
                      className="md:bg-transparent block rounded  py-2 pl-3 pr-4 text-white dark:text-white md:p-0 md:text-blue"
                      aria-current="page"
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="hover:bg-gray-100 md:hover:bg-transparent md:dark:hover:bg-transparent block rounded py-2 pl-3 pr-4 text-white dark:border-gray dark:text-blue dark:hover:bg-gray dark:hover:text-white md:p-0 md:hover:text-blue md:dark:hover:text-white"
                    >
                      Sign up
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </main>
    </>
  );
};
export default Navbar;
