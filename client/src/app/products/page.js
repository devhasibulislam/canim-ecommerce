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
 * Date: 03, November 2023
 */

"use client";

import Banner3 from "@/components/home/Banner3";
import ExpertChoice from "@/components/home/ExpertChoice";
import FilterSidebar from "@/components/porducts/FilterSidebar";
import FilteredProducts from "@/components/porducts/FilteredProducts";
import Container from "@/components/shared/Container";
import Main from "@/components/shared/layouts/Main";
import { useSearchParams } from "next/navigation";
import React from "react";

const Products = () => {
  const searchParams = useSearchParams();

  return (
    <Main>
      <Container className="flex flex-col gap-y-12 py-8">
        <section className="grid grid-cols-12 gap-8 pb-12 md:relative">
          <FilterSidebar searchParams={searchParams.get("category")} />
          <FilteredProducts />
        </section>
        <ExpertChoice className="!px-0" />
        <Banner3 className="!px-0" />
      </Container>
    </Main>
  );
};

export default Products;
