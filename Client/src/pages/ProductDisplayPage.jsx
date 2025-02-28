import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-").slice(-1)[0];
  console.log(productId);
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2">
      <div className="">
        <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
          <img
            src={data.image[image]}
            className="w-full h-full object-scale-down"
            alt=""
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          {data.image.map((img, index) => {
            return (
              <div
                key={img + index + "point"}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                  index === image && "bg-slate-300"
                }`}
              ></div>
            );
          })}
        </div>

        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, index) => {
              return (
                <div
                  className="w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md"
                  key={img + index}
                >
                  <img
                    src={img}
                    alt="min-product"
                    onClick={() => setImage(index)}
                    className="w-full h-full object-scale-down"
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center">
            <button
              onClick={handleScrollLeft}
              className="z-10 bg-white relative p-1 rounded-full shadow-lg"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 bg-white relative p-1 rounded-full shadow-lg"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
