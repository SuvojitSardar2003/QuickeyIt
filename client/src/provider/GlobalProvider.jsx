import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

function GlobalProvider({ children }) {
  const dispatch = useDispatch();

  // Fetch Cart Item
  const fetchCartItem = async () => {
    try {
      const resonse = await Axios({
        ...SummaryApi.getCartItem,
      });

      const { data: responseData } = resonse;
      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
        //console.log("Cart Item", responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  return (
    <GlobalContext.Provider value={{ fetchCartItem }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
