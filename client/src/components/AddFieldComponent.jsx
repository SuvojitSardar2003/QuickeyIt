import React from "react";
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed inset-0 bg-neutral-900/30 z-50 p-4 flex  items-center justify-center">
      <div className="bg-white max-w-md w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Add Field</h1>
          <button
            onClick={close}
            className="text-neutral-900 block w-fit ml-auto"
          >
            <IoClose size={25} />
          </button>
        </div>

        <input
          className="bg-blue-50 my-3 p-2 border outline-none focus-within:border-amber-300 w-full rounded"
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
        />
        <button
          disabled={!value.trim()}
          className={`cursor-pointer rounded-xl border text-sm px-4 py-2 mx-auto wi-fit block text-center font-semibold ${
            value.trim()
              ? "border-amber-300 hover:bg-amber-300 hover:text-neutral-900 "
              : "border-gray-300 bg-gray-200 text-gray-400 cursor-not-allowed"
          }  `}
          onClick={submit}
        >
          Add Field
        </button>

        {/*  <form action="" className="my-3 grid gap-4" onSubmit={handleSubmit}>
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
                    {data.image ? (
                      <img
                        alt="category"
                        src={data.image}
                        className="w-full h-full object-scale-down"
                      />
                    ) : (
                      <p className="text-sm text-neutral-500">No Image</p>
                    )}
                  </div>
                  <label htmlFor="uploadCategoryImage">
                    <div
                      className={`
                    ${
                      !data.name
                        ? "bg-gray-300"
                        : "border-amber-300 hover:bg-amber-300 hover:font-semibold"
                    }  border font-medium 
                    px-4 py-2 rounded cursor-pointer
                    `}
                    >
                      {loading?"Loading":"Upload Image"}
                      
                    </div>
                    <input
                      type="file"
                      id="uploadCategoryImage"
                      className="hidden"
                      onChange={handleUploadCategoryImage}
                      disabled={!data.name}
                    />
                  </label>
                </div>
              </div>
    
              <button
                className={`
                  ${
                    data.name && data.image
                      ? "bg-amber-400 cursor-pointer hover:bg-amber-300"
                      : "bg-gray-300"
                  }
                  py-2 font-semibold rounded
                  `}
              >
                Add Category
              </button>
            </form> */}
      </div>
    </section>
  );
};

export default AddFieldComponent;
