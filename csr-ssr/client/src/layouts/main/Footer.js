import React from "react";
import { Link } from "react-router-dom";
import LazyLoadingImage from "../../components/LazyLoadingImage";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <>
      <footer className="bg-white shadow py-8">
        <div className="container mx-auto">
          <div className="flex md:flex-row md:justify-between flex-col items-center md:gap-0 gap-y-4 md:px-0 px-4">
            <Link to="/" title="Ciseco ECommerce">
              <LazyLoadingImage
                src="/logo.png"
                alt="logo"
                className="block max-h-8 sm:max-h-10"
                height={"150"}
                width={"150"}
              />
            </Link>
            <p>© {year} Ciseco ECommerce, All Right Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
