import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import SummaryApi from "./common/SummaryApi";
import Axios from "./utils/Axios";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import { handleAddItemCart } from "./store/cartProduct";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));

      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
        // setCategoryData(responseData.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
        // setCategoryData(responseData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
        console.log(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    fetchCartItem();
  }, []);
  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
