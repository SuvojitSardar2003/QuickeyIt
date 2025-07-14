import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory } from "./store/productSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    //console.log("User Data", userData.data);
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      //setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        console.log("responseData.data", responseData.data);
        dispatch(setAllCategory(responseData.data));
        //setCategotyData(responseData.data);
      }
      //console.log(responseData);
    } catch (error) {
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        {/*className="text-3xl font-bold underline text-green-500"*/}
        {/*/QuickeyIt*/}
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
