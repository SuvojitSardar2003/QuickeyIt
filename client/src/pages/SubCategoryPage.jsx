import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import DiaplayTable from "../components/DiaplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../components/ViewImage";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import EditSubCategory from "../components/EditSubCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { setAllCategory } from "../store/productSlice"; // or your slice

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategoty] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageURL, setImageURL] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  });

  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.product.allCategory);

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
    if (!allCategory.length) {
      fetchAllCategory();
    }
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
              className="w-10 h-14 cursor-pointer"
              onClick={() => {
                setImageURL(row.original.image);
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={c._id + "table"}
                  className="shadow-md px-1 inline-block "
                >
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setOpenEdit(true);
                setEditData(row.original);
              }}
              className="p-2 bg-green-100 rounded-full  hover:text-green-600"
            >
              <HiPencil size={20} />
            </button>
            <button
              onClick={() => {
                setOpenConfirmBoxDelete(true);
                setDeleteSubCategory(row.original);
              }}
              className="p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600"
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: { _id: deleteSubCategory._id },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenConfirmBoxDelete(false);
        setDeleteSubCategory({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

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
        <DiaplayTable data={[...data].reverse()} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategoty(false)} />
      )}

      {imageURL && <ViewImage url={imageURL} close={() => setImageURL("")} />}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          refreshData={fetchSubCategory}
        />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteSubCategory}
          cancel={() => setOpenConfirmBoxDelete(false)}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
