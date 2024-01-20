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
 * Date: 20, January 2024
 */

"use client";

import Cross from "@/components/icons/Cross";
import Trash from "@/components/icons/Trash";
import Dashboard from "@/components/shared/layouts/Dashboard";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useReviewSellerMutation,
} from "@/services/user/userApi";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const { isLoading, data, error } = useGetUsersQuery();
  const users = useMemo(() => data?.data || [], [data]);
  const [filter, setFilter] = useState("all");

  const filteredUsers = useMemo(
    () => users.filter((user) => user?.role === filter || filter === "all"),
    [users, filter]
  );

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching Users...", { id: "allUsers" });
    }
    if (data) {
      toast.success(data?.description, { id: "allUsers" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "allUsers" });
    }
  }, [isLoading, data, error]);

  return (
    <Dashboard>
      <section className="flex flex-col gap-y-6">
        <div className="flex flex-row gap-x-2">
          <button
            type="button"
            className={`bg-purple-50 border border-purple-900 rounded-secondary text-purple-900 px-4 py-1 text-xs ${
              filter === "all" && "bg-purple-900 !text-white"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`bg-teal-50 border border-teal-900 rounded-secondary text-teal-900 px-4 py-1 text-xs ${
              filter === "admin" && "bg-teal-900 !text-white"
            }`}
            onClick={() => setFilter("admin")}
          >
            Admin
          </button>
          <button
            type="button"
            className={`bg-indigo-50 border border-indigo-900 rounded-secondary text-indigo-900 px-4 py-1 text-xs ${
              filter === "buyer" && "bg-indigo-900 !text-white"
            }`}
            onClick={() => setFilter("buyer")}
          >
            Buyer
          </button>
          <button
            type="button"
            className={`bg-cyan-50 border border-cyan-900 rounded-secondary text-cyan-900 px-4 py-1 text-xs ${
              filter === "seller" && "bg-cyan-900 !text-white"
            }`}
            onClick={() => setFilter("seller")}
          >
            Seller
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredUsers?.map((user) => (
            <div
              key={user?._id}
              className="flex flex-col gap-y-2 border rounded p-4 relative group cursor-default"
            >
              <Image
                src={user?.avatar?.url}
                alt={user?.avatar?.public_id}
                width={50}
                height={50}
                className="h-[50px] w-[50px] rounded-secondary object-cover"
              />
              <div className="flex flex-col gap-y-0.5">
                <h2 className="truncate">{user?.name}</h2>
                <p className="truncate text-sm">{user?.email}</p>
                <p className="truncate text-xs">{user?.phone}</p>
              </div>
              {user?.role === "buyer" && (
                <span className="bg-indigo-50 border border-indigo-900 px-2 rounded-secondary text-indigo-900 text-xs uppercase w-fit">
                  {user?.role}
                </span>
              )}
              {user?.role === "seller" && (
                <span className="bg-cyan-50 border border-cyan-900 px-2 rounded-secondary text-cyan-900 text-xs uppercase w-fit">
                  {user?.role}
                </span>
              )}
              {user?.role === "admin" && (
                <span className="bg-purple-50 border border-purple-900 px-2 rounded-secondary text-purple-900 text-xs uppercase w-fit">
                  {user?.role}
                </span>
              )}

              <Disapprove id={user?._id} role={user?.role} />
              <DeleteUser id={user?._id} role={user?.role} />
            </div>
          ))}
        </div>
      </section>
    </Dashboard>
  );
};

function DeleteUser({ id, role }) {
  const [deleteUser, { isLoading, data, error }] = useDeleteUserMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting User...", { id: "deleteUser" });
    }
    if (data) {
      toast.success(data?.description, { id: "deleteUser" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "deleteUser" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      {!(role === "admin" || role === "seller") && (
        <button
          type="button"
          className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900 absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity"
          onClick={() => deleteUser(id)}
          title="Delete User from DB"
        >
          <Trash />
        </button>
      )}
    </>
  );
}

function Disapprove({ id, role }) {
  const [disapproveSeller, { isLoading, data, error }] =
    useReviewSellerMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting User...", { id: "disapproveSeller" });
    }
    if (data) {
      toast.success(data?.description, { id: "disapproveSeller" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "disapproveSeller" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      {!(role === "admin" || role === "buyer") && (
        <button
          type="button"
          className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900 absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity"
          onClick={() =>
            disapproveSeller({ id, body: { status: "active", role: "buyer" } })
          }
          title="Demote User to Buyer"
        >
          <Cross />
        </button>
      )}
    </>
  );
}

export default Page;
