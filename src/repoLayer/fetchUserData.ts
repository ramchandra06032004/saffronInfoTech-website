import axios from "axios";
export const fetchUserData = async () => {
  try {
    const response = await axios.get("/api/getUserData");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch user data"
    );
  }
};
