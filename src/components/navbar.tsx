import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../styles/img/frizzy.png'

interface NavbarProps {
  loginStatus?: boolean;
  username: string;
}

const Navbar = (props: NavbarProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState<boolean>(false);
    const notifications = [{ "name": "Adi", "description": "SUIIIIIII", "date": "7h", "img": "https://essereuomo.it/wp-content/uploads/2021/10/sdsdsd.jpg"},
                          { "name": "Fejza", "description": "Ja sam glup", "date": "2d", "img": "https://media.istockphoto.com/id/476196983/photo/business-man-displaying-a-spread-of-cash.jpg?s=612x612&w=0&k=20&c=RBMDX5ChvnD-M8Vcxgwgo6D3jhxlFSjUjNMCLWO7gtM="},
                          { "name": "Inas", "description": "Ja sam gay", "date": "1w", "img": "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg"}]
    return (
      <>
        <Head>
          <title>Inas big gay bitch</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="fixed z-50 w-full">
          <nav className=" rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4 w-full">
            <div className="mx-auto w-10/12 flex flex-wrap items-center justify-between">
              <Link href="http://localhost:3000" className="flex self-start mt-2.5">
                <img
                  src={logo.src}
                  className="mr-3 h-6 sm:h-10 self-center"
                  alt="X' Tech Logo"
                />
                
              </Link>
              <div className="flex lg:order-1 self-start sm:ml-12 sm:mt-2.5">
                {/*phone size*/}
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  data-collapse-toggle="navbar-search"
                  aria-controls="navbar-search"
                  aria-expanded="false"
                  className="mr-1 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
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
                  <span className="sr-only">Search</span>
                </button>
                {/*pc size*/}
                <div className="relative hidden lg:block">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-500"
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
                    className="block search rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search..."
                  />
                </div>
              {/*phone size*/}
                <button
                  data-bs-toggle="collapse"
                  data-bs-target="#navbar-collapse"
                  type="button"
                  className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
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
                className={`w-full items-center justify-between lg:order-2 lg:flex lg:w-auto ${open ? "block" : "hidden"}`}
                id="navbar-collapse"
              >
                <div className="relative mt-3 lg:hidden">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-500"
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
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search..."
                  />
                </div>
                {!props.loginStatus ? (
                  <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:bg-white lg:text-sm lg:font-medium ">
                  <li className='order-2 lg:order-1 '>
                    <button onClick={()=>{setNotificationDropdownOpen(!notificationDropdownOpen); setProfileDropdownOpen(false)}} className="flex lg:ml-4 items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 lg:w-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Obavijesti</span> <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                        <div id="dropdownNavbar" className={`lg:absolute z-10 ${notificationDropdownOpen ? "block" : "hidden"} notifications mt-2 font-normal notificationssm bg-white divide-y divide-gray-100 rounded-lg shadow lg:w-80 dark:bg-gray-700 dark:divide-gray-600`}>
                          {notifications.map((notification) => {
                            return (
                              <ul className="py-2 divide-y divide-gray-50 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li className='notification rounded-lg w-11/12 m-auto'>
                                  <Link href="#" className="block px-4 py-2">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={notification.img} alt="" />
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                          {notification.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          <span className="text-gray-900 font-medium">{notification.description}</span>
                                        </div>
                                      </div>
                                      <div className="ml-auto text-sm text-gray-500">
                                        <time dateTime="2020-01-07">{notification.date} ago</time>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            )})}
                          </div>
                    </li>
                    
                    <li className='order-1 lg:order-2'>
                      <Link
                        href="#"
                        className="flex lg:mr-6 items-center justify-between block rounded text-gray-700 hover:bg-gray-100 lg:p-0 lg:hover:bg-transparent lg:hover:text-blue-700"
                        aria-current="page"
                      >
                        <div className='flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 lg:w-auto'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                          </svg>
                          <span className='ml-2'>Narudžbe</span>
                          <svg className="w-5 h-5 ml-1 invisible" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </div>
                        
                      </Link>
                    </li>
                    
                    <li className='order-0 lg:order-3'>
                        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" onClick={()=>{setProfileDropdownOpen(!profileDropdownOpen); setNotificationDropdownOpen(false)}} className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 lg:w-auto lg:ml-8"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          
                          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2">{props.username}</span> <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                        <div id="dropdownNavbar" className={` z-10 ${profileDropdownOpen ? "block" : "hidden"} details mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow lg:w-36 dark:bg-gray-700 dark:divide-gray-600 lg:absolute`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                              <li>
                                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>Profil</div>
                                </Link>
                              </li>
                              <li>
                                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center space-x-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  <div>Postavke</div>
                                </Link>
                              </li>
                              <li>
                                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                </svg>
                                <div>Pomoć</div>
                                </Link>
                              </li>
                            </ul>
                            <div className="py-1">
                              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                <div>Odjavi se</div>
                              </Link>
                            </div>
                        </div>
                    </li>
                  </ul>
                  ) : (
                    <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:bg-white lg:text-sm lg:font-medium lg:dark:bg-gray-900">
                    <li>
                      <Link
                        href="#"
                        className="block rounded font-semibold py-1 pl-3 pr-3 lg:bg-transparent hover:bg-gray-100"
                        aria-current="page"
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block font-semibold text-blue-700 rounded py-1 pl-3 pr-3 hover:bg-gray-100"
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