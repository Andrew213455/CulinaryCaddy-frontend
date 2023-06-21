import Recipe from "./Recipe";

export default interface Account {
  _id?: string;
  googleId: string;
  name: string;
  favorites: Recipe[];
  photoURL: string;
}
