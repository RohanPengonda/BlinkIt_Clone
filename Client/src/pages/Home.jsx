import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";
const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  return (
    <section className="bg-white">
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          } `}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {new Array(10).fill(null).map((c, index) => {
          return (
            <div className="bg-white rounded p-4 min-h-36 grid gap-2 shadow-">
              <div className="bg-blue-100 min-h-20 rounded"></div>
              <div className="bg-blue-100 h-8 rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 h-8 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
