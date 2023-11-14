import React from "react";
import { useNavigate } from "react-router-dom";

const TableWarning = ({ title }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <div
          id="alert-additional-content-4"
          className="p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">
              No <span className="uppercase">{title}</span> to show
            </h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            All you need to add some {title} to show.
          </div>
          <div className="flex">
            <button
              type="button"
              className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
              onClick={() => navigate(`/dashboard/add-new-${title}`)}
            >
              <svg
                aria-hidden="true"
                className="-ml-0.5 mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add more
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableWarning;
