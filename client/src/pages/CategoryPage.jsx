import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useEffect } from "react";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import EditCategory from "../components/EditCategory";
import { use } from "react";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {
  const [openUploadCategoty, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategotyData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setCategotyData(responseData.data);
      }
      //console.log(responseData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      {/*sticky top-20 z-10*/}
      <div className="sticky top-20 z-10 p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory((preve) => !preve)}
          className="cursor-pointer rounded-xl border text-sm border-amber-300 hover:bg-amber-300 hover:text-neutral-900 px-3 py-1"
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && <NoData />}

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData.map((category, index) => {
          return (
            //h-48 hover:h-56
            <div
              className="w-32 h-56 overflow-hidden rounded shadow-md"
              key={category._id}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-scale-down"
              />
              <div className="items-center h-9 flex gap-2">
                <button
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategoty && (
        <UploadCategoryModel
          fetchDate={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchDate={fetchCategory}
        />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
          cancel={() => setOpenConfirmBoxDelete(false)}
        />
      )}
    </section>
  );
};

export default CategoryPage;
