import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/Axios";
//import { fetchCategory } from "./pages/CategoryPage";
import SummaryApi from "./common/SummaryApi";
/* import GlobalProvider from "./provider/GlobalProvider";
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from "./components/CartMobile"; */
//import { handleAddItemCart } from "./store/cartProduct";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobileLink from "./components/CartMobile";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async () => {
    //console.log("User Data", userData.data);
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      //setLoading(true);
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        //console.log("responseData.data", responseData.data);
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
        //setCategotyData(responseData.data);
      }
      //console.log(responseData);
    } catch (error) {
    } finally {
      //setLoading(false);
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      //setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        //console.log("responseData.data", responseData.data);
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
        //setCategotyData(responseData.data);
      }
      //console.log(responseData);
    } catch (error) {
    } finally {
      //setLoading(false);
      //dispatch(setLoadingCategory(false));
    }
  };

  useEffect(() => {
    //console.log("App mounted ✅");
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    //fetchCartItem();
  }, []);

  return (
    <>
      <GlobalProvider>
        <Header />
        <main className="min-h-[80vh]">
          {/*className="text-3xl font-bold underline text-green-500"*/}
          {/*/QuickeyIt*/}
          <Outlet />
        </main>
        <Footer />
        <Toaster />
        {location.pathname !== "/checkout" && <CartMobileLink />}
      </GlobalProvider>
    </>
  );
}

export default App;
