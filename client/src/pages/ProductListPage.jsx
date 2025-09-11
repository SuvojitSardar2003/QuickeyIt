import React from "react";
import { use } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import SummaryApi from "../common/SummaryApi";
import { useEffect } from "react";
import { fetchSubCategory } from "../utils/fetchSubCategory.js";
import Loading from "../components/Loading.jsx";
import CardProductHome from "../components/CardProductHome.jsx";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [subCategories, setSubCategories] = useState([]);
  const params = useParams();
  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    .join(" ");

  console.log("Params", params);

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }

      console.log("responseData", responseData);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
    //fetchSubCategory();
    const load = async () => {
      const result = await fetchSubCategory();
      setSubCategories(result);
    };
    load();
  }, [params]);

  console.log(subCategories);
  return (
    <section className="sticky top-28 lg:top-20">
      <div className="container sticky top-28 mx-auto grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/*sub category*/}
        <div className="min-h-[79vh]">sub category</div>

        {/*product*/}
        <div className="">
          <div className="bg-white shadow-md p-2">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>

          <div>
            <div>
              {data.map((p, index) => {
                return (
                  <CardProductHome
                    data={p}
                    key={p._id + "productSubCategory" + index}
                  />
                );
              })}
            </div>

            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
