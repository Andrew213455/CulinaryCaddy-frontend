import axios from "axios";
import Rating from "../models/Rating";

const baseURL = process.env.REACT_APP_API_URL || "";

export const getAllRatings = (recipeId: string): Promise<Rating[]> => {
  return axios.get(`${baseURL}/rating/${recipeId}`).then((res) => res.data);
};

export const addRating = (rating: Rating): Promise<Rating> => {
  return axios.post(`${baseURL}/rating`, rating).then((res) => res.data);
};

export const deleteRating = (_id: string): Promise<void> => {
  return axios.delete(`${baseURL}/rating/${_id}`).then((res) => res.data);
};
