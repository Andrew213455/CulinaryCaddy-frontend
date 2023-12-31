import axios from "axios";
import Account from "../models/Account";
import Recipe from "../models/Recipe";

const baseURL = process.env.REACT_APP_API_URL || "";

export const getAllAccounts = (): Promise<Account[]> => {
  return axios.get(`${baseURL}/accounts`).then((res) => res.data);
};

export const getAccountById = (id: string): Promise<Account> => {
  return axios.get(`${baseURL}/accounts/${id}`).then((res) => res.data);
};

export const addAccount = (newAccount: Account): Promise<Account> => {
  return axios.post(`${baseURL}/accounts`, newAccount).then((res) => res.data);
};

export const deleteAccount = (id: string): Promise<Account> => {
  return axios.delete(`${baseURL}/account/${id}`).then((res) => res.data);
};

export const addFavorite = (id: string, recipe: Recipe): Promise<Account> => {
  return axios
    .patch(`${baseURL}/fave/add/${id}`, recipe)
    .then((res) => res.data);
};

export const deleteFavorite = (
  id: string,
  recipe: Recipe
): Promise<Account> => {
  return axios
    .patch(`${baseURL}/fave/delete/${id}`, recipe)
    .then((res) => res.data);
};

export const updateAccount = (
  id: string,
  updatedAccount: Account
): Promise<Account> => {
  return axios
    .put(`${baseURL}.accounts/${id}`, updatedAccount)
    .then((res) => res.data);
};
