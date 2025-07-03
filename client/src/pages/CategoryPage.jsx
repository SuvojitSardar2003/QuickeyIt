import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";

const CategoryPage = () => {
  const [openUploadCategoty, setOpenUploadCategory] = useState(false);

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory((preve) => !preve)}
          className="cursor-pointer rounded-xl border text-sm border-amber-300 hover:bg-amber-300 hover:text-neutral-900 px-3 py-1"
        >
          Add Category
        </button>
      </div>

      {openUploadCategoty && (
        <UploadCategoryModel close={() => setOpenUploadCategory(false)} />
      )}
    </section>
  );
};

export default CategoryPage;
