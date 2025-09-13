import React from "react";
import { use } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/Axios.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import SummaryApi from "../common/SummaryApi";
import { useEffect } from "react";
import { fetchSubCategory } from "../utils/fetchSubCategory.js";
import Loading from "../components/Loading.jsx";
import CardProductHome from "../components/CardProductHome.jsx";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/validURLConvert.js";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [subCategories, setSubCategories] = useState([]);
  const params = useParams();
  const AllsubCategoryName = useSelector(
    (state) => state.product.allSubCategory
  );
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  console.log(`All Sub Category Names:${AllsubCategoryName}`);

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
          limit: 8,
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

    const sub = AllsubCategoryName.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id == categoryId;
      });
      return filterData ? filterData : false;
    });
    setDisplaySubCategory(sub);
  }, [params, AllsubCategoryName]);

  console.log(subCategories);
  return (
    <section className="sticky top-28 lg:top-20">
      <div className="container lg:max-w-full lg:px-16 sticky top-28 mx-auto grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/*sub category*/}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {DisplaySubCategory.map((s, index) => {
            const link = `/${validURLConvert(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }/${validURLConvert(s.name)}-${s._id}`;

            return (
              <Link
                to={link}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-100 cursor-pointer ${
                  subCategoryId === s._id ? "bg-green-100" : ""
                }
                `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className="w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/*product*/}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>

          <div>
            <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 ">
                {data.map((p, index) => {
                  return (
                    <CardProductHome
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                  );
                })}
              </div>
            </div>

            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
