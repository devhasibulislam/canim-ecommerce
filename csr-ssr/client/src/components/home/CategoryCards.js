import React from "react";
import { Link } from "react-router-dom";
import LazyLoadingImage from "../LazyLoadingImage";

const CategoryCards = ({ categories }) => {
  const bottomBanner = [
    "https://chisnghiax.com/ciseco/static/media/explore6.d820796c6233d6fd068004c49905dda6.svg",
    "https://chisnghiax.com/ciseco/static/media/explore5.31cdd38104cf6ff9b87f13d23831c063.svg",
    "https://chisnghiax.com/ciseco/static/media/explore9.9cb58d1f5a9bf47be0be877012199caa.svg",
    "https://chisnghiax.com/ciseco/static/media/explore4.1eff03fe05cba351d4d177ed235e5721.svg",
    "https://chisnghiax.com/ciseco/static/media/explore8.266bb971ad46f757d26cd01f28164a6f.svg",
    "https://chisnghiax.com/ciseco/static/media/explore7.de4664b57a4a6234974977afbe804be3.svg",
  ];

  return (
    <>
      {categories?.map(({ _id, title, thumbnail, subcategories }) => (
        <div
          key={_id}
          className="nc-CardCategory4 relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white group hover:nc-shadow-lg transition-shadow"
          data-nc-id="CardCategory4"
        >
          <div>
            <div className="absolute bottom-0 right-0 max-w-[280px] opacity-80">
              <img
                src={bottomBanner[Math.floor(Math.random() * (5 - 0) + 0)]}
                alt={Math.floor(Math.random() * (5 - 0) + 0)}
              />
            </div>
            <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div
                  className="w-20 h-20 rounded-full overflow-hidden z-0 bg-orange-50 shadow"
                  data-nc-id="NcImage"
                >
                  <LazyLoadingImage
                    height={"80"}
                    width={"80"}
                    src={thumbnail?.url}
                    alt={thumbnail?.public_id}
                    className={"object-cover w-20 h-20"}
                  />
                </div>
                <span className="text-xs text-slate-700 font-medium">
                  {subcategories?.length} subcategories
                </span>
              </div>
              <div className="">
                <span className="block mb-2 text-sm text-slate-500 uppercase">
                  {_id}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
              </div>
              <Link
                className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors"
                to={`/category/${title}/${_id}`}
              >
                <span>See Collection</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4 ml-2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          <Link
            to={`/category/${title?.toLowerCase()}/${_id}`}
            className="absolute inset-0"
          ></Link>
        </div>
      ))}
    </>
  );
};

export default CategoryCards;
