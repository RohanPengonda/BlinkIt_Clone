import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const [subcategorydata, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const allCategory = useSelector((state) => state.product.allCategory);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subcategorydata.category.findIndex(
      (el) => el._id === categoryId
    );
    subcategorydata.category.splice(index, 1);
    setSubCategoryData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subcategorydata,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
        if (fetchData) {
          fetchData();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-100 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded ">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-2">
            <label htmlFor="name"> Name</label>
            <input
              id="name"
              name="name"
              value={subcategorydata.name}
              onChange={handleChange}
              type="text"
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="border w-full lg:w-36 h-36 bg-blue-50 flex items-center justify-center">
                {!subcategorydata.image ? (
                  <p className="text-neutral-500 text-sm">No Image</p>
                ) : (
                  <img
                    src={subcategorydata.image}
                    className="w-full h-full object-scale-down"
                    alt="sub-category"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div className="px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer">
                  Upload Image
                </div>
                <input
                  type="file"
                  name=""
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          <div className="grid gap-1">
            <label>Select Category</label>
            <div className="border focus-within:border-primary-200 rounded outline-none">
              {/* display value */}
              <div className="flex flex-wrap gap-2">
                {subcategorydata.category.map((cat, index) => {
                  return (
                    <p
                      className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                      key={cat._id + "selectedValue"}
                    >
                      {cat.name}
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <IoClose size={25} />
                      </div>
                    </p>
                  );
                })}
              </div>
              {/* select CAtegory */}

              <select
                className="w-full p-2 bg-transparent border "
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryIndex = allCategory.find(
                    (el) => el._id == value
                  );
                  setSubCategoryData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryIndex],
                    };
                  });
                }}
              >
                <option value={""}> Select Category</option>

                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category._id + "subcategory"}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            className={`px-4 py-2 border ${
              subcategorydata.name &&
              subcategorydata.image &&
              subcategorydata.category[0]
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-100"
            } font-semibold`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
