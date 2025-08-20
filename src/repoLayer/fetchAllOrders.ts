import axios from "axios";

export const fetchAllOrders = async (ids: [string]) => {
  try {
    const ordersResponse = await axios.post("/api/getAllOrders", {
      orderIds: ids,
    });
    return ordersResponse.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "An error occurred while fetching orders."
    );
  }
};
