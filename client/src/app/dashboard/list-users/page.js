/**
 * Title: Write a program using JavaScript on Page
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 10, November 2023
 */

"use client";

import UserDemote from "@/components/dashboard/UserDemote";
import Dashboard from "@/components/shared/layouts/Dashboard";
import DashboardLading from "@/components/shared/skeletonLoading/DashboardLading";
import { useGetUsersQuery } from "@/services/user/userApi";
import Image from "next/image";
import React, { useEffect } from "react";

const ListUsers = () => {
  const {
    data: usersData,
    error: usersError,
    isLoading,
  } = useGetUsersQuery();
  const users = usersData?.data || [];

  useEffect(() => {
    if (usersError) {
      alert(usersError?.data?.description);
    }
  }, [usersError]);

  return (
    <Dashboard>
      {isLoading || users?.length === 0 ? (
        <DashboardLading />
      ) : (
        <div className="w-full h-full">
          <div className="overflow-x-auto h-full w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Avatar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Cart
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Store
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user?._id}
                    className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100"
                  >
                    <td className="px-6 py-4 text-gray-800">
                      <Image
                        src={user?.avatar?.url}
                        alt={user?.avatar?.public_id}
                        height={30}
                        width={30}
                        className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                      {user?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                      {user?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                      {user?.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                      {user?.cart?.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                      {user?.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                      {user?.store?.title || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                      {user?.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user?.role === "seller" ? (
                        "N/A"
                      ) : (
                        <UserDemote user={user} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default ListUsers;
