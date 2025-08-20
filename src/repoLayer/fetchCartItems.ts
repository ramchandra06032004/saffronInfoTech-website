import axios from "axios";
import { fetchUserData } from "./fetchUserData";

export const fetchCartItems = async (callbackFunction: CallableFunction) => {
  try {
    const userResponse = await fetchUserData();
    const { cartItem } = userResponse;
    const cartResponse = await axios.post("/api/getAllCartItem", {
        productIds: cartItem,
    });
    console.log("////////////////",cartItem);
    callbackFunction(cartResponse.data);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching cart items."
    );
  }
};
