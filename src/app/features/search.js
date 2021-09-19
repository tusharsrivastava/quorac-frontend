import { get } from "../api";

export const fetchSuggestions = async (query, limit = 50) => {
  try {
    const response = await get(`/posts/search?term=${query}&limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
