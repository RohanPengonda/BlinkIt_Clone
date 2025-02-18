import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const columnHelper = createColumnHelper();

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
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
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: () => {
        return (
          <div className="flex justify-center items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-20 h-20"
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
    }),
  ];

  console.log("xol:   ", column);

  return (
    <section className="">
      <div className="p-2  bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Sub-Category</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Sub-Category
        </button>
      </div>

      {/* Display Data Table */}

      <div>
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} />
      )}
    </section>
  );
};

export default SubCategoryPage;
