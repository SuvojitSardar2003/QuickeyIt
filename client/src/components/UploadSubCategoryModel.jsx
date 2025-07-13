import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";

const UploadSubCategoryModel = ({ close }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const [loading, setLoading] = useState(false);

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

        <form action="" className="my-3 grid gap-4">
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

              {/*select category*/}
              <select name="" id="" className="w-full p-2 bg-transparent  outline-none">
                <option value="" disabled>
                  Select Category
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
