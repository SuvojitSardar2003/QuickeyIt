import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import DiaplayTable from "../components/DiaplayTable";
import { createColumnHelper } from "@tanstack/react-table";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategoty] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {/*console.log("row", row.original.image);*/}
            <img
              src={row.original.image}
              alt={row.original.name}
              //w-12 h-20
              className="w-10 h-14"
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
    }),
  ];

  return (
    <section>
      {/*sticky top-20 z-10*/}
      <div className="sticky top-20 z-10 p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategoty(true)}
          className="cursor-pointer rounded-xl border text-sm border-amber-300 hover:bg-amber-300 hover:text-neutral-900 px-3 py-1"
        >
          Add Sub Category
        </button>
      </div>

      <div>
        <DiaplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategoty(false)} />
      )}
    </section>
  );
};

export default SubCategoryPage;
