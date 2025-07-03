import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const UploadCategoryModel = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadCategoryImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/30 p-4 flex  items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button
            onClick={close}
            className="text-neutral-900 block w-fit ml-auto"
          >
            <IoClose size={25} />
          </button>
        </div>

        <form action="" className="my-3 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName" id="categoryName">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Enter Categoty Name"
              value={data.name}
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-amber-300 outline-none rounded"
            />
          </div>

          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                <p className="text-sm text-neutral-500">No Image</p>
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  disabled={!data.name}
                  className={`
                ${!data.name ? "bg-gray-400" : "bg-amber-300"}
                px-4 py-2 rounded cursor-pointer
                `}
                >
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                  onChange={handleUploadCategoryImage}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
