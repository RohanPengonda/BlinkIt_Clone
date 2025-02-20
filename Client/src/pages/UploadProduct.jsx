import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import uploadImage from "../utils/UploadImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: [],
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);

  const [selectCategory, setSelectCategory] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageURL = ImageResponse.data.url;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageURL],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  return (
    <section>
      <div className="p-2  bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>

      <div className="grid p-3">
        <form className="grid gap-2" action="">
          {/* Product Name */}
          <div className="grid gap-1">
            <label htmlFor="name"> Product Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              value={data.name}
              required
              placeholder="Enter Product Name:"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Product Description  */}
          <div className="grid gap-1">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
              value={data.description}
              rows={3}
              placeholder="Enter Description:"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>
          {/* Upload Product Image  */}
          <div>
            <p>Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex items-center justify-center cursor-pointer"
              >
                <div className="text-center flex flex-col items-center justify-center">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={28} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  className="hidden"
                  type="file"
                  name=""
                  accept="image/*"
                  id="productImage"
                  onChange={handleUploadImage}
                />
              </label>
              {/* Display Uploaded Images */}
              <div className="flex gap-4 flex-wrap">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="mt-1 h-20 w-20 min-w-20 bg-blue-50 border relative group"
                    >
                      <img
                        src={img}
                        alt={img}
                        onClick={() => {
                          setViewImageURL(img);
                        }}
                        className="w-full h-full object-scale-down cursor-pointer"
                      />
                      <div
                        onClick={handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-700 rounded text-white hidden group-hover:block cursor-pointer"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Select Category  */}
          <div className="grid gap-1">
            <label htmlFor="">Select Category: </label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                name=""
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);
                  setData((prev) => {
                    return {
                      ...prev,
                      catgory: [...prev.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
                id=""
              >
                <option value="">Select Category</option>
                {allCategory.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })}
              </select>
              {data.category.map((c, index) => {
                return (
                  <div key={c._id + index + "productsection"}>
                    <p>{c.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>

      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
      )}
    </section>
  );
};

export default UploadProduct;
