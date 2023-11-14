import React, { useState } from "react";
import {
  useDisplayUsersQuery,
  useUpdateUserMutation,
} from "../../features/auth/authApi";
import DashboardLoading from "../../components/loading/DashboardLoading";
import LazyLoadingImage from "../../components/LazyLoadingImage";
import DashboardInlineLoading from "../../components/loading/DashboardInlineLoading";
import TableWarning from "../../components/dashboard/TableWarning";

const ListUser = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: userData, isLoading: fetchingUser } = useDisplayUsersQuery({
    page,
    limit,
  });
  const [disableUser, { isLoading: disablingUser }] = useUpdateUserMutation();

  const stores = userData?.data || [];
  const count = userData?.count || 0;

  return (
    <>
      {fetchingUser ? (
        <DashboardLoading />
      ) : stores?.length ? (
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
                        Avatar
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Gender
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Store
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        DOB
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Cart
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
                    {stores.map(
                      ({
                        _id,
                        avatar,
                        name,
                        email,
                        phone,
                        gender,
                        store,
                        status,
                        dob,
                        cart,
                      }) => (
                        <tr
                          key={_id}
                          className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            <LazyLoadingImage
                              src={avatar?.url}
                              alt={avatar?.public_id}
                              className={
                                "h-10 w-10 object-cover object-center rounded-full border-2 border-cyan-500"
                              }
                              height={"40"}
                              width={"40"}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {gender}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {store ? store?.title : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {dob.split("T")[0].split("-").reverse().join("/")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {cart?.length}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {disablingUser ? (
                              <DashboardInlineLoading />
                            ) : (
                              <>
                                {status === "inactive" ? (
                                  <span
                                    className="text-green-500 hover:text-green-700 ml-4 cursor-pointer"
                                    onClick={() =>
                                      disableUser({
                                        uid: _id,
                                        userData: { status: "active" },
                                      })
                                    }
                                  >
                                    Enable
                                  </span>
                                ) : (
                                  <span
                                    className="text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                                    onClick={() =>
                                      disableUser({
                                        uid: _id,
                                        userData: { status: "inactive" },
                                      })
                                    }
                                  >
                                    Disable
                                  </span>
                                )}
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
        <TableWarning title={"user"} />
      )}
    </>
  );
};

export default ListUser;
