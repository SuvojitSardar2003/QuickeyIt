import React from "react";
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAllCategory, setLoadingCategory } from "../store/productSlice";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const Home = () => {
  /* <div /*className="text-3xl font-bold underline text-green-500">
      /QuickeyIt {<br />} Home
    </div> */
  const dispatch = useDispatch();
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
      //console.log(responseData);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoadingCategory(false));
      //setLoading(false);
    }
  };

  useEffect(() => {
    if (!categoryData.length) {
      fetchCategory();
    }
  }, []);

  console.log(categoryData);

  return (
    <section className="bg-white">
      <div className="container mx-auto my-4 px-4">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && animate - pulse
          }`}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse">
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div>
                  <div>
                    <img
                      src={Array.isArray(cat.image) ? cat.image[0] : cat.image}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default Home;
