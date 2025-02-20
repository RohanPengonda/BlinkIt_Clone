import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import uploadImage from "../utils/UploadImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../components/AddFieldComponent";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [moreField, setMoreField] = useState([]);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

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

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmit = {};

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  return (
    <section>
      <div className="p-2  bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>

      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit} action="">
          {/* Product Name */}
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              {" "}
              Product Name:
            </label>
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
            <label htmlFor="description" className="font-medium">
              Description:
            </label>
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
            <label htmlFor="" className="font-medium">
              Select Category:{" "}
            </label>
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
                      category: [...prev.category, category],
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
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 "
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => {
                          handleRemoveCategory(index);
                        }}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Select Sub-Catetgory  */}
          <div className="grid gap-1">
            <label htmlFor="" className="font-medium">
              Sub-Category:{" "}
            </label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                name=""
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (el) => el._id === value
                  );
                  setData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
                id=""
              >
                <option value="" className="text-neutral-600">
                  Select Sub-Category
                </option>
                {allSubCategory.map((c, index) => {
                  return (
                    <option key="" value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 "
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => {
                          handleRemoveSubCategory(index);
                        }}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Unit  */}
          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">
              Unit
            </label>
            <input
              id="unit"
              name="unit"
              type="number"
              onChange={handleChange}
              value={data.unit}
              required
              placeholder="Enter Product Unit:"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Stock  */}
          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">
              {" "}
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              onChange={handleChange}
              value={data.stock}
              required
              placeholder="Enter Product Stock:"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Price  */}
          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">
              {" "}
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={handleChange}
              value={data.price}
              required
              placeholder="Enter Product Price:"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Discount  */}
          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">
              Discount
            </label>
            <input
              id="discount"
              name="discount"
              type="number"
              onChange={handleChange}
              value={data.discount}
              required
              placeholder="Enter Product Discount:"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Add More Fields  */}

          {Object?.keys(data?.more_details)?.map((k, index) => {
            return (
              <div key="" className="grid gap-1">
                <label htmlFor={k}> {k}</label>
                <input
                  id={k}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((prev) => {
                      return {
                        ...prev,
                        more_details,
                        ...prev.more_details,
                        [k]: value,
                      };
                    });
                  }}
                  value={data.more_details[k]}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
            );
          })}
          <div
            onClick={() => setOpenAddField(true)}
            className="inline-block bg-primary-200 hover:bg-white py-1 px-3 w-32 text-center font-semibold border hover:border-primary-200 border-neutral-900 cursor-pointer rounded"
          >
            Add Fields
          </div>
        </form>
      </div>

      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;
