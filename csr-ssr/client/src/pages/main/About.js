import React from "react";

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            About Us
          </h2>
        </div>

        <div className="container mx-auto mt-8 flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-14 text-neutral-900">
          <div className="">
            <h2 className=" text-3xl md:text-4xl font-semibold">
              🚀 Fast Facts
            </h2>
            <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500">
              {" "}
              We’re impartial and independent, and every day we create
              distinctive, world-class programmes and content
            </span>
          </div>
        </div>
        <div className="container mx-auto grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
          <div className="p-6 bg-neutral-50 rounded-2xl">
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl">
              10 million
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base">
              Articles have been public <br /> around the world (as of Sept. 30,
              2023)
            </span>
          </div>
          <div className="p-6 bg-neutral-50 rounded-2xl">
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl">
              100,000
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base">
              Registered users <br /> account (as of Sept. 30, 2023)
            </span>
          </div>
          <div className="p-6 bg-neutral-50 rounded-2xl">
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl">
              220+
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base">
              Countries and regions have <br /> our presence (as of Sept. 30,
              2023)
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
