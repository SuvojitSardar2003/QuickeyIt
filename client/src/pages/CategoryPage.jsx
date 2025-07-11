import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useEffect } from "react";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const CategoryPage = () => {
  const [openUploadCategoty, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategotyData] = useState([]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setCategotyData(responseData.data);
      }
      //console.log(responseData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

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

      {!categoryData[0] && !loading && <NoData />}

      <div className="p-4">
        {categoryData.map((category, index) => {
          return (
            <div className="w-40 h-56 overflow-hidden bg-red-500 rounded shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-52 object-scale-down"
              />
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategoty && (
        <UploadCategoryModel close={() => setOpenUploadCategory(false)} />
      )}
    </section>
  );
};

export default CategoryPage;
