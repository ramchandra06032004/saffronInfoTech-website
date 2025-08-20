import axios from "axios";

export const deleteFromCart = async (id: string) => {
  try {
    await axios.delete("/api/removeItemFromCart", { data: { productId: id } });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while removing the product from the cart."
    );
  }
};
