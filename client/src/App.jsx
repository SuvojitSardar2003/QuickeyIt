import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    //console.log("User Data", userData.data);
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };
  useEffect(() => {
    fetchUser();
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
