import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
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
          <div className="grid gap-1">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              value={data.name}
              required
              placeholder="Enter Product name"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
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

          <div>
            <p>Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex items-center justify-center cursor-pointer"
              >
                <div className="text-center flex flex-col items-center justify-center">
                  <FaCloudUploadAlt size={28} />
                  <p>Upload Image</p>
                </div>
                <input
                  className="hidden"
                  type="file"
                  name=""
                  id="productImage"
                />
              </label>
              {/* Display Uploaded Images */}
              <div></div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadProduct;
