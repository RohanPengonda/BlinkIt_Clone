import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCardNumber = new Array(6).fill(null);

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

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link to="" className="text-green-600 hover:text-green-400">
          See All
        </Link>
      </div>
      <div className="flex items-center gap-4 md:gap-6 lg:gap-8 container mx-auto px-4">
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
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
