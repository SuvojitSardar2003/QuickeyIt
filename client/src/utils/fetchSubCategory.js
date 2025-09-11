import Axios from "./Axios";
import AxiosToastError from "./AxiosToastError";
import SummaryApi from "../common/SummaryApi";

export const fetchSubCategory = async () => {
  try {
    //setLoading(true);
    const response = await Axios({
      ...SummaryApi.getSubCategory,
    });
    const { data: responseData } = response;

    if (responseData.success) {
      //setData(responseData.data);
      return responseData.data;
    }
    return [];
  } catch (error) {
    AxiosToastError(error);
    return [];
  } /*finally {
    setLoading(false);
  }*/
};
