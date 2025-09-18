/* import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EditProductAdmin = ({ close, fetchDate, data: CategoryData }) => {
  const [data, setData] = useState({
    _id: CategoryData._id,
    name: CategoryData.name,
    image: CategoryData.image,
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: data,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchDate();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setLoading(false);

    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      };
    });
    //console.log(Image);
  };

  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900/30 z-50 p-4 flex justify-center items-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Update Category</h1>
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
                  {loading ? "Loading..." : "Upload Image"}
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
            Update Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProductAdmin;
 */

import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";
import { useEffect } from "react";

const EditProductAdmin = ({ close, data: propsData, fetchProductData }) => {
  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
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
    const imageUrl = ImageResponse.data.url;

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        if (close) {
          close();
        }
        fetchProductData();
        setData({
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
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 bg-neutral-900/30 z-50 p-4">
      <div className="bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]">
        <section className="">
          <div className="p-2 bg-white shadow-md flex items-center justify-between">
            <h2 className="font-semibold">Upload Product</h2>
            <button onClick={close}>
              <IoClose size={20} />
            </button>
          </div>
          <div className="grid p-3">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              {/*Name field*/}
              <div className="grid gap-1">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border border-black focus-within:border-amber-300  rounded"
                />
              </div>

              {/*description*/}
              <div className="grid gap-1">
                <label htmlFor="description" className="font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  type="text"
                  placeholder="Enter product description"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  required
                  multiple
                  rows={3}
                  className="bg-blue-50 p-2 outline-none border border-black focus-within:border-amber-300  rounded resize-none"
                />
              </div>

              {/*image*/}
              <div>
                <p className="font-medium">Image</p>
                <div>
                  <label
                    htmlFor="productImage"
                    className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
                  >
                    <div className="text-center flex justify-center items-center flex-col">
                      {imageLoading ? (
                        <>
                          <Loading /> Loading...{""}
                        </>
                      ) : (
                        <>
                          <FaCloudUploadAlt size={35} />
                          <p>Upload Image</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="productImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </label>

                  {/*display uploded image*/}
                  <div className="flex flex-wrap gap-4">
                    {data.image.map((img, index) => {
                      return (
                        <div
                          key={img + index}
                          className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                        >
                          <img
                            src={img}
                            alt={img}
                            className="w-full h-full object-scale-down cursor-pointer"
                            onClick={() => setViewImageURL(img)}
                          />
                          <div
                            onClick={() => handleDeleteImage(index)}
                            className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                          >
                            <MdDelete />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/*category*/}
              <div className="grid gap-1">
                <label htmlFor="category" className="font-medium">
                  Category
                </label>

                <div>
                  <select
                    className="bg-blue-50 border focus-within:border-amber-300 w-full p-2 rounded"
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectCategory(value);
                      const categoryDetails = allCategory.find(
                        (el) => el._id === value
                      );

                      // Prevent adding duplicates
                      const alreadyAdded = data.category.some(
                        (el) => el._id === categoryDetails._id
                      );

                      if (!alreadyAdded && categoryDetails) {
                        const updatedData = {
                          ...data,
                          category: [...data.category, categoryDetails],
                        };
                        //console.log("Updated subCategoryData:", updatedData); // ✅ Logs after category selection
                        setData(updatedData);
                      }

                      // Reset dropdown
                      setSelectCategory("");
                    }}
                  >
                    <option value={""}>Select Category</option>
                    {allCategory.map((c, index) => {
                      return <option value={c?._id}>{c.name}</option>;
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.category.map((c, index) => {
                      return (
                        <div
                          key={c._id + index + "productsection"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                        >
                          <p>{c.name}</p>
                          <div
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveCategory(index)}
                          >
                            <IoClose size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/*subCategory*/}
              <div className="grid gap-1">
                <label className="font-medium">Sub Category</label>
                <div>
                  <select
                    className="bg-blue-50 border w-full p-2 rounded"
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectSubCategory(value);
                      const categoryDetails = allSubCategory.find(
                        (el) => el._id === value
                      );

                      // Prevent adding duplicates
                      const alreadyAdded = data.subCategory.some(
                        (el) => el._id === categoryDetails._id
                      );

                      if (!alreadyAdded && categoryDetails) {
                        const updatedData = {
                          ...data,
                          subCategory: [...data.subCategory, categoryDetails],
                        };
                        //console.log("Updated subCategoryData:", updatedData); // ✅ Logs after category selection
                        setData(updatedData);
                      }

                      // Reset dropdown
                      setSelectSubCategory("");
                    }}
                  >
                    <option value={""} className="text-neutral-600">
                      Select Sub Category
                    </option>
                    {allSubCategory.map((c, index) => {
                      return <option value={c?._id}>{c.name}</option>;
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.subCategory.map((c, index) => {
                      return (
                        <div
                          key={c._id + index + "productsection"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                        >
                          <p>{c.name}</p>
                          <div
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveSubCategory(index)}
                          >
                            <IoClose size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/*unit*/}
              <div className="grid gap-1">
                <label htmlFor="unit" className="font-medium">
                  Unit
                </label>
                <input
                  id="unit"
                  type="text"
                  placeholder="Enter product unit"
                  name="unit"
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border border-black focus-within:border-amber-300 rounded"
                />
              </div>

              {/*stock*/}
              <div className="grid gap-1">
                <label htmlFor="stock" className="font-medium">
                  Number of Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  placeholder="Enter product stock"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border border-black focus-within:border-amber-300 rounded"
                />
              </div>

              {/*price*/}
              <div className="grid gap-1">
                <label htmlFor="price" className="font-medium">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border border-black focus-within:border-amber-300 rounded"
                />
              </div>

              {/*discount*/}
              <div className="grid gap-1">
                <label htmlFor="discount" className="font-medium">
                  Discount
                </label>
                <input
                  id="discount"
                  type="number"
                  placeholder="Enter product discount"
                  name="discount"
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border border-black focus-within:border-amber-300  rounded"
                />
              </div>

              {/*Add More Field*/}

              {Object?.keys(data?.more_details)?.map((k, index) => {
                return (
                  <div className="grid gap-1">
                    <label htmlFor={k} className="font-medium">
                      {k}
                    </label>
                    <input
                      id={k}
                      type="text"
                      placeholder={`Enter ${k}`}
                      name={k}
                      value={data?.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((preve) => {
                          return {
                            ...preve,
                            more_details: {
                              ...preve.more_details,
                              [k]: value,
                            },
                          };
                        });
                      }}
                      required
                      className="bg-blue-50 p-2 outline-none border border-black focus-within:border-amber-300 rounded"
                    />
                  </div>
                );
              })}

              <div
                onClick={() => setOpenAddField(true)}
                className="cursor-pointer rounded-xl border text-sm border-amber-300 hover:bg-amber-300 hover:text-neutral-900 px-3 py-2 w-32 text-center font-semibold"
              >
                Add Fields
              </div>

              {/*Submit Button*/}
              <button className="bg-amber-400 cursor-pointer hover:bg-amber-300 py-2 rounded font-semibold">
                Update Product
              </button>
            </form>
          </div>

          {ViewImageURL && (
            <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
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
      </div>
    </section>
  );
};

export default EditProductAdmin;
