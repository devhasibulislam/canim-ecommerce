import { Fragment } from "react";
import { Transition, Popover } from "@headlessui/react";
import MenuItems from "./MenuItems";

export default function Dropdown() {
  return (
    <Popover as="div" className="relative inline-block text-left z-50">
      <div>
        <Popover.Button className="flex items-center font-medium">
          Category{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="text-opacity-70 
                  ml-2 h-5 w-5 text-neutral-700 group-hover:text-opacity-80 transition ease-in-out duration-150 "
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Popover.Button>
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
        <Popover.Panel className="absolute -right-[90px] w-80 overflow-y-auto scrollbar-hide origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <MenuItems />
          <div className="p-4 bg-neutral-50">
            <a
              className="flow-root px-2 py-2 space-y-0.5 transition duration-150 ease-in-out rounded-md focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              href="/shop"
            >
              <div className="flex items-center">
                <span className="text-sm font-medium ">Go to our shop</span>
              </div>
              <span className="block text-sm text-slate-500">
                Look for what you need and love.
              </span>
            </a>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
