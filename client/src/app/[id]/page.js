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
 * Date: 22, October 2023
 */

"use client";

import Left from "@/components/details/Left";
import Relatives from "@/components/details/Relatives";
import Right from "@/components/details/Right";
import Banner2 from "@/components/home/Banner2";
import Container from "@/components/shared/Container";
import Main from "@/components/shared/layouts/Main";
import { addUser } from "@/features/auth/authSlice";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { useGetProductQuery } from "@/services/product/productApi";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Detail = () => {
  const { id } = useParams();
  const { data: productData, isError: productError } = useGetProductQuery(id);
  const product = productData?.data || {};
  const dispatch = useDispatch();
  const { data: userData, isError: userError } = usePersistLoginQuery();
  const user = userData?.data || {};

  useEffect(() => {
    if (!userError) {
      dispatch(addUser(user));
    }
    if (productError) {
      alert("Something went wrong, refresh the page.");
    }
  }, [productError, userData, userError]);

  return (
    <Main>
      <Container>
        <div className="h-full w-full flex flex-col gap-y-20">
          <div className="grid grid-cols-12 gap-8">
            <Left product={product} />
            <Right product={product} />
          </div>
          <Relatives />
          <Banner2 className={"!px-0"} />
        </div>
      </Container>
    </Main>
  );
};

export default Detail;
