/**
 * Title: Write a program using JavaScript on Policies
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
 * Date: 24, October 2023
 */

import React from "react";
import Shipping from "../icons/Shipping";
import Return from "../icons/Return";
import Delivery from "../icons/Delivery";
import Policy from "../icons/Policy";

const Policies = () => {
  const policies = [
    {
      title: "Free Shipping",
      detail: "On orders over $50.00",
      icon: <Shipping />,
      className: "bg-red-50",
    },
    {
      title: "Very easy to return",
      detail: "Just phone number.",
      icon: <Return />,
      className: "bg-sky-50",
    },
    {
      title: "Nationwide Delivery",
      detail: "Fast delivery nationwide.",
      icon: <Delivery />,
      className: "bg-green-50",
    },
    {
      title: "Refunds Policy",
      detail: "60 days return for any reason.",
      icon: <Policy />,
      className: "bg-amber-50",
    },
  ];

  return (
    <section className="grid md:grid-cols-2 grid-cols-1 gap-4">
      {policies.map((policy, index) => (
        <div
          key={index}
          className={`flex flex-col gap-y-3 ${policy.className} p-5 rounded-primary`}
        >
          {policy.icon}
          <article className="flex flex-col gap-y-0.5">
            <h2 className="text-lg">{policy.title}</h2>
            <p className="text-sm">{policy.detail}</p>
          </article>
        </div>
      ))}
    </section>
  );
};

export default Policies;
