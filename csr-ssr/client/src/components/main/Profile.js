import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import LazyLoadingImage from "../LazyLoadingImage";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const items = [
    {
      name: "Dashboard",
      icon: DashboardIcon,
      link: "/dashboard",
    },
    {
      name: "My Profile",
      icon: ProfileIcon,
      link: "/my-profile",
    },
    {
      name: "My Order",
      icon: OrderIcon,
      link: "/my-order",
    },
    {
      name: "Contact Us",
      icon: ContactIcon,
      link: "/contact-us",
    },
    {
      name: "About Us",
      icon: AboutIcon,
      link: "/about-us",
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left z-20">
      <div>
        <Menu.Button className="text-gray-600 hover:text-blue-600 flex gap-x-4 items-center">
          <svg
            className=" w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="block md:hidden">Profile</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute md:-left-[500%] left-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-7 rounded-2xl">
          <div className="flex flex-col gap-y-4">
            {Object.keys(user).length ? (
              <div className="flex items-center space-x-3">
                <div className="relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-12 h-12 ring-1 ring-white">
                  <LazyLoadingImage
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                    src={user?.avatar?.url}
                    alt={user?.name}
                    height={"48"}
                    width={"48"}
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold">{user?.name}</h4>
                  <p className="text-xs mt-0.5">{user?.email}</p>
                </div>
              </div>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/sign-in"
                    className={`${
                      active ? "shadow" : "text-gray-900"
                    } group flex gap-x-4 w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <LogoutIcon className="h-5 w-5" aria-hidden="true" />
                    Login
                  </Link>
                )}
              </Menu.Item>
            )}
            <hr />
            <div className="flex flex-col gap-y-6">
              {items.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      to={item.link}
                      className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
                        active ? "text-slate-900/50 shadow-sm" : "text-gray-900"
                      }`}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500">
                        <item.icon />
                      </div>

                      <div className="ml-4">
                        <p className="text-sm font-medium ">{item.name}</p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
              ))}
              <>
                {Object.keys(user).length !== 0 ? (
                  <button
                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => dispatch(logout())}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 text-neutral-500">
                      <LogoutIcon />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium ">Logout</p>
                    </div>
                  </button>
                ) : (
                  ""
                )}
              </>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

function DashboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
      />
    </svg>
  );
}

function LogoutIcon(props) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M15 12H3.62"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function ProfileIcon(props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function OrderIcon(props) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 12.2H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8 16.2H12.38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function AboutIcon(props) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44715 2 1.97 6.47715 1.97 12C1.97 17.5228 6.44715 22 11.97 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M4.89999 4.92993L8.43999 8.45993"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M4.89999 19.07L8.43999 15.54"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M19.05 19.07L15.51 15.54"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M19.05 4.92993L15.51 8.45993"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function ContactIcon(props) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0001 7.88989L10.9301 9.74989C10.6901 10.1599 10.8901 10.4999 11.3601 10.4999H12.6301C13.1101 10.4999 13.3001 10.8399 13.0601 11.2499L12.0001 13.1099"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8.30011 18.0399V16.8799C6.00011 15.4899 4.11011 12.7799 4.11011 9.89993C4.11011 4.94993 8.66011 1.06993 13.8001 2.18993C16.0601 2.68993 18.0401 4.18993 19.0701 6.25993C21.1601 10.4599 18.9601 14.9199 15.7301 16.8699V18.0299C15.7301 18.3199 15.8401 18.9899 14.7701 18.9899H9.26011C8.16011 18.9999 8.30011 18.5699 8.30011 18.0399Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export default Profile;
