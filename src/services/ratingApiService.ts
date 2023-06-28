import axios from "axios";
import Rating from "../models/Rating";
import Average from "../models/Average";

const baseURL = process.env.REACT_APP_API_URL || "";

export const getAverageRating = (recipeId: string): Promise<Average[]> => {
  return axios.get(`${baseURL}/avgRating/${recipeId}`).then((res) => res.data);
};

export const getRatingsByRecipe = (recipeId: string): Promise<Rating[]> => {
  return axios.get(`${baseURL}/rating/${recipeId}`).then((res) => res.data);
};

export const addRating = (rating: Rating): Promise<Rating> => {
  return axios.post(`${baseURL}/rating`, rating).then((res) => res.data);
};

export const deleteRating = (_id: string): Promise<void> => {
  return axios.delete(`${baseURL}/rating/${_id}`).then((res) => res.data);
};
