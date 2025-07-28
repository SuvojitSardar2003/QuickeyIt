import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { IoClose } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategory, setAllSubCategory } from "../store/productSlice";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AddFieldComponent from "../components/AddFieldComponent";
import successAlert from "../utils/SuccessAlert";

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");

  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteImageIndex, setDeleteImageIndex] = useState(null);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageURL = ImageResponse.data.url;

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageURL],
      };
    });
    setImageLoading(false);
    //console.log("file", file);
  };

  const handleDeleteImage = async (index) => {
    try {
      data.image.splice(index, 1);
      setData((preve) => {
        return {
          ...preve,
        };
      });

      toast.success("Image deleted successfully");
      //fetchCategory();
      //fetchSubCategory();
      setOpenConfirmBoxDelete(false);
      setDeleteImageIndex(null);
      handleRemoveCategorySelected(selectedCategoryId);
      handleRemoveSubCategorySelected(selectedSubCategoryId);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.product.allCategory);

  useEffect(() => {
    //fetchCategory();
    //fetchSubCategory();
    if (!allCategory.length) {
      fetchAllCategory();
    }
    if (!allSubCategory.length) {
      fetchAllSubCategory();
    }
  }, []);

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

  const handleRemoveCategorySelected = (categoryId) => {
    const index = data.category.findIndex((el) => el._id === categoryId);
    data.category.splice(index, 1);
    setData((preve) => {
      return { ...preve };
    });
  };

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const fetchAllSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleRemoveSubCategorySelected = (subCategoryId) => {
    const index = data.subCategory.findIndex((el) => el._id === subCategoryId);
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return { ...preve };
    });
  };

  //const [moreField, setMoreField] = useState([]);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const resetForm = () => {
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
    setSelectedCategoryId("");
    setSelectedSubCategoryId("");
    setViewImageURL("");
    setDeleteImageIndex(null);
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

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
      }
      resetForm();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      {/*sticky top-20 z-10*/}
      <div className="sticky top-20 z-10 p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
        {/* <button
          onClick={() => setOpenUploadCategory((preve) => !preve)}
          className="cursor-pointer rounded-xl border text-sm border-amber-300 hover:bg-amber-300 hover:text-neutral-900 px-3 py-1"
        >
          Add Product
        </button> */}
      </div>

      <div className="grid p-3">
        <form action="" className="my-3 grid gap-4" onSubmit={handleSubmit}>
          {/*Name field*/}
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Product Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border border-black focus-within:border-amber-300 outline-none rounded"
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
              placeholder="Enter Product Description"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
              className="bg-blue-50 p-2 border border-black focus-within:border-amber-300 outline-none rounded resize-none"
            />
          </div>

          {/*image*/}
          <div className="grid gap-1">
            <p className="font-medium">Image</p>
            {/*className="flex gap-4 flex-col lg:flex-row items-center"*/}
            <div>
              {/*h-36 w-full lg:w-36*/}
              <label
                htmlFor="productImage"
                className="border bg-blue-50 h-36 flex items-center justify-center rounded cursor-pointer"
              >
                <div className="text-center flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <>
                      <Loading /> Loading...{" "}
                    </>
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} /> Upload Image
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

              {/*display upload image*/}
              <div className="flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="h-20 w-20 min-w-20 mt-2 bg-blue-50 border relative group"
                    >
                      <img
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageURL(img)}
                      />
                      <span
                        className="absolute top-0 right-0 hidden group-hover:block cursor-pointer"
                        onClick={() => {
                          setOpenConfirmBoxDelete(true);
                          setDeleteImageIndex(index);
                        }}
                      >
                        <IoClose />
                      </span>
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

            <div className="focus-within:border-amber-300 rounded">
              {/*display value*/}
              <div className="flex flex-wrap gap-2 ">
                {data.category.map((cat, index) => {
                  return (
                    <div
                      key={cat._id + "selectedValue"}
                      className="bg-gray-50 shadow-md px-1 m-1 flex gap-2 items-center"
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
                className="w-full p-2 bg-blue-50 outline-none border"
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategoryId(value);
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
                  setSelectedCategoryId("");
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category._id}
                      key={category._id + "uploadcategory"}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/*subCategory*/}
          <div className="grid gap-1">
            <label htmlFor="category" className="font-medium">
              Sub Category
            </label>

            <div className=" focus-within:border-amber-300 rounded">
              {/*display value*/}
              <div className="flex flex-wrap gap-2 ">
                {data.subCategory.map((s_cat, index) => {
                  return (
                    <div
                      key={s_cat._id + index + "selectedSubCatValue"}
                      className="bg-gray-50 shadow-md px-1 m-1 flex gap-2 items-center"
                    >
                      <span>{s_cat.name}</span>
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() =>
                          handleRemoveSubCategorySelected(s_cat._id)
                        }
                      >
                        <IoIosClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/*select sub category*/}
              <select
                name=""
                id=""
                value={selectedSubCategoryId}
                className="w-full p-2 bg-blue-50 outline-none border"
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedSubCategoryId(value);
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
                  setSelectedSubCategoryId("");
                }}
              >
                <option value="">Select Sub Category</option>
                {allSubCategory.map((subCategory, index) => {
                  return (
                    <option
                      value={subCategory._id}
                      key={subCategory._id + "uploadSubCategory"}
                    >
                      {subCategory?.name}
                    </option>
                  );
                })}
              </select>
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
              placeholder="Enter Product Unit"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border border-black focus-within:border-amber-300 outline-none rounded"
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
              placeholder="Enter Product Stock"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border border-black focus-within:border-amber-300 outline-none rounded"
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
              placeholder="Enter Product Price"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border border-black focus-within:border-amber-300 outline-none rounded"
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
              placeholder="Enter Product Discount"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border border-black focus-within:border-amber-300 outline-none rounded"
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
                  className="bg-blue-50 p-2 border border-black focus-within:border-amber-300 outline-none rounded"
                />
              </div>
            );
          })}

          {/*cursor-pointer rounded-xl border text-sm border-amber-300 hover:bg-amber-300 hover:text-neutral-900 px-3 py-1*/}
          <div
            className="cursor-pointer rounded-xl border text-sm border-amber-300 hover:bg-amber-300 hover:text-neutral-900 px-3 py-2 w-32 text-center font-semibold"
            onClick={() => setOpenAddField(true)}
          >
            Add Field
          </div>

          {/*Submit Button*/}
          <button
            className={`
              ${
                data.name &&
                data.image &&
                data.description &&
                data.category &&
                data.subCategory &&
                data.unit &&
                data.stock &&
                data.price &&
                data.discount &&
                data?.more_details
                  ? "bg-amber-400 cursor-pointer hover:bg-amber-300"
                  : "bg-gray-300"
              }
              py-1 border font-semibold rounded
              `}
          >
            Submit
          </button>
        </form>
      </div>

      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => {
            setOpenConfirmBoxDelete(false);
            setDeleteImageIndex(null);
          }}
          confirm={() => handleDeleteImage(deleteImageIndex)}
          cancel={() => {
            setOpenConfirmBoxDelete(false);
            setDeleteImageIndex(null);
          }}
        />
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
