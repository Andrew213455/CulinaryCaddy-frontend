import axios from "axios";
import Note from "../models/Note";

const baseURL = process.env.REACT_APP_API_URL || "";

export const getNoteById = (
  accountId: string,
  recipeId: string
): Promise<Note[]> => {
  return axios
    .get(`${baseURL}/notes/${accountId}/${recipeId}`)
    .then((res) => res.data);
};

export const getAllNotes = (accountId: string): Promise<Note[]> => {
  return axios.get(`${baseURL}/notes/${accountId}`).then((res) => res.data);
};

export const addNote = (note: Note): Promise<Note> => {
  return axios.post(`${baseURL}/notes`, note).then((res) => res.data);
};

export const deleteNote = (_id: string): Promise<void> => {
  return axios.delete(`${baseURL}/notes/${_id}`).then((res) => res.data);
};
