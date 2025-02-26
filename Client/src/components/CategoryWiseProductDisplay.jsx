import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCardNumber = new Array(6).fill(null);
  const containerRef = useRef();

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
      // console.log(responseData);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link to="" className="text-green-600 hover:text-green-400">
          See All
        </Link>
      </div>
      <div
        className="flex items-center gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
        ref={containerRef}
      >
        {loading &&
          loadingCardNumber.map((_, index) => {
            return <CardLoading key={"CategoryWiseProductDisplay22" + index} />;
          })}

        {data?.map((p, index) => {
          return (
            <CardProduct
              data={p}
              key={p._id + "CategorywiseProductDisplay" + index}
            />
          );
        })}

        <div className="w-full left-0 right-0 absolute  justify-between container max-auto hidden lg:flex">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-white shadow-lg p-2 hover:bg-gray-100 rounded-full text-lg"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative bg-white shadow-lg p-2 hover:bg-gray-100 rounded-full text-lg"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
