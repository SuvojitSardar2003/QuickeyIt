import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

/* import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllCategory } from "../store/productSlice"; */

const UploadSubCategoryModel = ({ close }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const allCategory = useSelector((state) => state.product.allCategory);

  //console.log("All Categorty sub category page", allCategory);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setSubCategoryData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      };
    });
    setLoading(false);
    //console.log(Image);
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((preve) => {
      return { ...preve };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        //fetchDate();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  //console.log("subCategoryDate", subCategoryData);

  /* const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.product.allCategory); */

  /*  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await Axios({ ...SummaryApi.getCategory });
        const { data: responseData } = response;

        if (responseData.success) {
          dispatch(setAllCategory(responseData.data));
        }
      } catch (error) {
        AxiosToastError(error);
      }
    };

    // Only fetch if empty
    if (!allCategory || allCategory.length === 0) {
      fetchAllCategory();
    }
  }, [allCategory, dispatch]); */

  return (
    <section className="fixed inset-0 bg-neutral-900/30 z-50 p-4 flex  items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button
            onClick={close}
            className="text-neutral-900 block w-fit ml-auto"
          >
            <IoClose size={25} />
          </button>
        </div>

        <form
          action=""
          className="my-3 grid gap-4"
          onSubmit={handleSubmitSubCategory}
        >
          {/*Name*/}
          <div className="grid gap-1">
            <label htmlFor="subCategoryName" id="subCategoryName">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="subCategoryName"
              placeholder="Enter Sub Category Name"
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-amber-300 outline-none rounded"
              value={subCategoryData.name}
              onChange={handleOnChange}
            />
          </div>

          {/*Iamge*/}
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {subCategoryData.image ? (
                  <img
                    alt="category"
                    src={subCategoryData.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>

              <label htmlFor="uploadSubCategoryImage">
                <div
                  className={`
                ${
                  !subCategoryData.name
                    ? "bg-gray-300"
                    : "border-amber-300 hover:bg-amber-300 hover:font-semibold"
                }  border font-medium 
                px-4 py-2 rounded cursor-pointer
                `}
                >
                  {loading ? "Loading" : "Upload Image"}
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                  disabled={!subCategoryData.name}
                />
              </label>
            </div>
          </div>

          {/*Category*/}
          <div className="grid gap-1">
            <label htmlFor="">Select Category</label>

            <div className="border focus-within:border-amber-300 rounded">
              {/*display value*/}
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cat, index) => {
                  return (
                    <div
                      key={cat._id + "selectedValue"}
                      className="bg-white shadow-md px-1 m-1 flex gap-2 items-center"
                    >
                      <span>{cat.name}</span>
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <IoIosClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/*select category*/}
              <select
                name=""
                id=""
                value={selectedCategoryId}
                className="w-full p-2 bg-transparent  outline-none border"
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategoryId(value);
                  const categoryDetails = allCategory.find(
                    (el) => el._id === value
                  );

                  // Prevent adding duplicates
                  const alreadyAdded = subCategoryData.category.some(
                    (el) => el._id === categoryDetails._id
                  );

                  if (!alreadyAdded && categoryDetails) {
                    const updatedData = {
                      ...subCategoryData,
                      category: [...subCategoryData.category, categoryDetails],
                    };
                    //console.log("Updated subCategoryData:", updatedData); // ✅ Logs after category selection
                    setSubCategoryData(updatedData);
                  }

                  // Reset dropdown
                  setSelectedCategoryId("");
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category._id}
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
            className={`py-1 border font-semibold rounded 
            ${
              subCategoryData?.name &&
              subCategoryData?.image &&
              subCategoryData?.category[0]
                ? "bg-amber-400 cursor-pointer hover:bg-amber-300"
                : "bg-gray-300"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
