import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-").slice(-1)[0];
  console.log(productId);
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (response.success) {
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

  console.log(data);

  return <div>ProductDetails</div>;
};

export default ProductDisplayPage;
