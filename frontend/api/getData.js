import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

export const getUsers = async (search = "") => {
  try {
    const response = await axios.get(`${API_URL}/getData`, {
      params: { search },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: error.response?.data || "Something went wrong" };
  }
};