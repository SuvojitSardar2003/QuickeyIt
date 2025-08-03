import React, { useState } from "react";
import ViewImage from "./ViewImage";

const ProductCardAdmin = ({ key, data }) => {
     const [imageURL, setImageURL] = useState();
  //className="w-32 h-56 overflow-hidden rounded shadow-md" key={key}
  return (
    <div>
      <div
        className="w-36 h-56 overflow-hidden rounded shadow-md bg-white p-4"
        key={key}
      >
        {/* {data?.image?.length > 0 ? ( */}
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full object-scale-down"
          onClick={()=> setImageURL(data?.image[0])}
        />
        {/* ) : (
          <div> No Image</div>
        )} */}
        <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
        <p className="text-slate-400">{data?.unit}</p>
      </div>
      {imageURL && <ViewImage url={imageURL} close={() => setImageURL("")} />}
    </div>
  );
};

export default ProductCardAdmin;
