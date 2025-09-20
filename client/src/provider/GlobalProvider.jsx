import { createContext, use, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

function GlobalProvider({ children }) {
  const dispatch = useDispatch();
  const [totalQtyItem, setTotalQtyItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const cartItem = useSelector((state) => state?.cartItem.cart);
  const user = useSelector((state) => state?.user);

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
        //toast.success(responseData.message);
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
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

  //total item and total price
  useEffect(() => {
    const totalQty = cartItem.reduce((preve, curr) => {
      return preve + curr.quantity;
    }, 0);
    setTotalQtyItem(totalQty);

    const totalP = cartItem.reduce((preve, curr) => {
      return (
        preve +
        pricewithDiscount(curr?.productId?.price, curr?.productId?.discount) *
          curr?.quantity
      );
    }, 0);
    setTotalPrice(totalP);

    const notDiscountPrice = cartItem.reduce((preve, curr) => {
      return preve + curr?.productId?.price * curr.quantity;
    }, 0);
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  const handleLogoutOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCartItem();
    handleLogoutOut();
    fetchAddress();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        totalPrice,
        totalQtyItem,
        notDiscountTotalPrice,
        fetchAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
