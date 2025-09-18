import React, { useState } from "react";
import ViewImage from "./ViewImage";
import EditProductAdmin from "./EditProductAdmin";
import ConfirmBox from "./ConfirmBox";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [imageURL, setImageURL] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  //className="w-32 h-56 overflow-hidden rounded shadow-md" key={key}

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          _id: data._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchProductData) {
          fetchProductData();
        }
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      <div className="w-36 p-4 bg-white rounded">
        <div>
          {/* {data?.image?.length > 0 ? ( */}
          <img
            src={data?.image[0]}
            alt={data?.name}
            className="w-full h-full object-scale-down"
            onClick={() => setImageURL(data?.image[0])}
          />
          {/* ) : (
          <div> No Image</div>
        )} */}
        </div>
        <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
        <p className="text-slate-400">{data?.unit}</p>
        <div className="grid grid-cols-2 gap-3 py-2">
          <button
            onClick={() => setEditOpen(true)}
            className="border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => setOpenDelete(true)}
            className="border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-800 hover:bg-red-200 rounded"
          >
            Delete
          </button>
        </div>

        {editOpen && (
          <EditProductAdmin
            fetchProductData={fetchProductData}
            data={data}
            close={() => setEditOpen(false)}
          />
        )}

        {openDelete && (
          <ConfirmBox
            close={() => setOpenDelete(false)}
            confirm={handleDelete}
            cancel={() => setOpenDelete(false)}
          />
        )}
      </div>

      {imageURL && <ViewImage url={imageURL} close={() => setImageURL("")} />}
    </>
  );
};

export default ProductCardAdmin;
