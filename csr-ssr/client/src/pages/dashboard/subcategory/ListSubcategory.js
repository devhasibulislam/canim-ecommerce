import React, { useState } from "react";
import {
  useDisplaySubcategoriesQuery,
  useRemoveSubcategoryMutation,
} from "../../../features/subcategory/subcategoryApi";
import DashboardLoading from "../../../components/loading/DashboardLoading";
import LazyLoadingImage from "../../../components/LazyLoadingImage";
import DashboardInlineLoading from "../../../components/loading/DashboardInlineLoading";
import { Link } from "react-router-dom";
import TableWarning from "../../../components/dashboard/TableWarning";

const ListSubcategory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: subcategoriesData, isLoading: displayingSubcategories } =
    useDisplaySubcategoriesQuery({
      page,
      limit,
    });
  const [removeCategory, { isLoading: removingSubcategory }] =
    useRemoveSubcategoryMutation();

  const subcategories = subcategoriesData?.data || [];
  const count = subcategoriesData?.count || 0;

  return (
    <>
      {displayingSubcategories ? (
        <DashboardLoading />
      ) : subcategories?.length ? (
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Thumbnail
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Updated
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subcategories.map(
                      ({
                        _id,
                        thumbnail,
                        title,
                        category,
                        createdAt,
                        updatedAt,
                      }) => (
                        <tr
                          key={_id}
                          className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            <LazyLoadingImage
                              src={thumbnail?.url}
                              alt={thumbnail?.public_id}
                              className={
                                "h-10 w-10 object-cover object-center rounded-full border-2 border-cyan-500"
                              }
                              height={"40"}
                              width={"40"}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {category?.title || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {createdAt
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {updatedAt
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {removingSubcategory ? (
                              <DashboardInlineLoading />
                            ) : (
                              <>
                                <Link
                                  className="text-green-500 hover:text-green-700"
                                  to={`/dashboard/update-subcategory/${_id}`}
                                >
                                  Update
                                </Link>
                                <span
                                  className="text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                                  onClick={() => removeCategory(_id)}
                                >
                                  Delete
                                </span>
                              </>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="inline-flex rounded mt-4 justify-center" role="group">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              onClick={() => page >= 2 && setPage(page - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left w-4 h-4 mr-2 fill-current"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
              Prev
            </button>
            <select
              id="gender"
              name="gender"
              className="form-select border-gray-200"
              onChange={(event) => setLimit(Number(event.target.value))}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
              onClick={() =>
                page < Math.ceil(count / limit) && setPage(page + 1)
              }
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-right w-4 h-4 ml-2 fill-current"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <TableWarning title={"subcategory"} />
      )}
    </>
  );
};

export default ListSubcategory;
