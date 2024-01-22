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
import Inform from "@/components/icons/Inform";
import Trash from "@/components/icons/Trash";
import Modal from "@/components/shared/Modal";
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
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
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
              <p className="flex flex-row gap-x-2">
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
                {user?.status === "inactive" && (
                  <span className="bg-red-50 border border-red-900 px-2 rounded-secondary text-red-900 text-xs uppercase w-fit">
                    in review
                  </span>
                )}
              </p>

              <Disapprove user={user} />
              <DeleteUser user={user} />
            </div>
          ))}
        </div>
      </section>
    </Dashboard>
  );
};

function DeleteUser({ user }) {
  const [isOpen, setIsOpen] = useState(false);
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
      {!(user?.role === "admin" || user?.role === "seller") && (
        <button
          type="button"
          className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900 absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity"
          onClick={() => setIsOpen(true)}
          title="Delete User from DB"
        >
          <Trash />
        </button>
      )}

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-4 lg:w-1/5"
        >
          <article className="flex flex-col gap-y-4">
            <p className="text-xs bg-yellow-500/50 text-black px-2 py-0.5 rounded-sm text-center">
              Account will be deleted permanently!
            </p>
            <div className="flex flex-col gap-y-2 items-center">
              <h1 className="text-xl">Are you sure?</h1>
            </div>
            <div className="flex flex-row justify-center gap-x-4">
              <button
                className="text-white bg-slate-500 px-3 py-1.5 rounded text-sm"
                onClick={() => setIsOpen(false)}
              >
                No, cancel
              </button>
              <button
                className="flex flex-row gap-x-2 items-center text-white bg-red-500 px-3 py-1.5 rounded text-sm"
                onClick={() => deleteUser(user?._id)}
              >
                <Trash /> Yes, delete
              </button>
            </div>
          </article>
        </Modal>
      )}
    </>
  );
}

function Disapprove({ user }) {
  const [isOpen, setIsOpen] = useState(false);
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
      {!(user?.role === "admin" || user?.role === "buyer") && (
        <button
          type="button"
          className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900 absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity"
          onClick={() => setIsOpen(true)}
          title="Demote User to Buyer"
        >
          <Cross />
        </button>
      )}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-4 lg:w-1/5"
        >
          <article className="flex flex-col gap-y-4">
            <p className="text-xs bg-yellow-500/50 text-black px-2 py-0.5 rounded-sm text-center">
              Permanently Demote <b>{user?.name?.split(" ")[0]}</b> to Buyer?
            </p>
            <div className="flex flex-col gap-y-2 items-center">
              <h1 className="text-xl">Are you sure?</h1>
            </div>
            <div className="flex flex-row justify-center gap-x-4">
              <button
                className="text-white bg-slate-500 px-3 py-1.5 rounded text-sm"
                onClick={() => setIsOpen(false)}
              >
                No, cancel
              </button>
              <button
                className="flex flex-row gap-x-2 items-center text-white bg-red-500 px-3 py-1.5 rounded text-sm"
                onClick={() =>
                  disapproveSeller({
                    id: user?._id,
                    body: { status: "active", role: "buyer" },
                  })
                }
              >
                <Trash /> Yes, continue
              </button>
            </div>
          </article>
        </Modal>
      )}
    </>
  );
}

export default Page;
