import React, { useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategoty] = useState(false);

  return (
    <section>
      {/*sticky top-20 z-10*/}
      <div className="sticky top-20 z-10 p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategoty(true)}
          className="cursor-pointer rounded-xl border text-sm border-amber-300 hover:bg-amber-300 hover:text-neutral-900 px-3 py-1"
        >
          Add Sub Category
        </button>
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategoty(false)} />
      )}
    </section>
  );
};

export default SubCategoryPage;
