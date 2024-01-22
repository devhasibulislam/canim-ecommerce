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

import Check from "@/components/icons/Check";
import Cross from "@/components/icons/Cross";
import Inform from "@/components/icons/Inform";
import Trash from "@/components/icons/Trash";
import Modal from "@/components/shared/Modal";
import Dashboard from "@/components/shared/layouts/Dashboard";
import {
  useGetSellerRequestQuery,
  useReviewSellerMutation,
} from "@/services/user/userApi";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const { isLoading, data, error } = useGetSellerRequestQuery();
  const users = useMemo(() => data?.data || [], [data]);

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
      {users?.length === 0 ? (
        <p className="text-sm flex flex-row justify-center gap-x-2 items-center">
          <Inform /> No Seller Request Found!
        </p>
      ) : (
        <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {users?.map((user) => (
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

              <Approve user={user} />
              <Disapprove user={user} />
            </div>
          ))}
        </section>
      )}
    </Dashboard>
  );
};

function Approve({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [approveSeller, { isLoading, data, error }] = useReviewSellerMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting User...", { id: "approveSeller" });
    }
    if (data) {
      toast.success(data?.description, { id: "approveSeller" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "approveSeller" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      {!(user?.role === "admin") && (
        <button
          type="button"
          className="bg-green-50 border border-green-900 p-0.5 rounded-secondary text-green-900 absolute top-2 right-10 group-hover:opacity-100 opacity-0 transition-opacity"
          onClick={() => setIsOpen(true)}
        >
          <Check />
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
              Permanently Promote <b>{user?.name?.split(" ")[0]}</b> to Seller?
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
                className="flex flex-row gap-x-2 items-center text-white bg-green-500 px-3 py-1.5 rounded text-sm"
                onClick={() =>
                  approveSeller({
                    id: user?._id,
                    body: { status: "active", role: "seller" },
                  })
                }
              >
                <Check />
                Yes, continue
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
