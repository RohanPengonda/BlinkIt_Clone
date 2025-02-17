import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";

const UploadSubCategoryModel = () => {
  const [subcategorydata, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

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
    const file = e.target.file[0];
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

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-100 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded ">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button>
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-3" action="">
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
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
