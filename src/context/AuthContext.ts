import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/Account";
export interface AuthContextModel {
  user: User | null; // null when not logged in
  account: Account | null;
  checkFavorite: (id: string) => boolean;
}
const defaultValue: AuthContextModel = {
  user: null,
  account: null,
  checkFavorite: () => false,
};
const AuthContext = createContext(defaultValue);
export default AuthContext;
