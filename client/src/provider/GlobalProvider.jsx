import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

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

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItemQty,
        data: {
          _id: cartId,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ fetchCartItem, updateCartItem, deleteCartItem }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
