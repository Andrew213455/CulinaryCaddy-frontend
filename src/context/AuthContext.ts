import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/Account";
export interface AuthContextModel {
  user: User | null; // null when not logged in
  account: Account | null;
  checkFavorite: (id: string) => boolean;
  setAccount: (account: Account) => void;
  hideFavorite: boolean;
  setHideFavorite: (boolean: boolean) => void;
}
const defaultValue: AuthContextModel = {
  user: null,
  account: null,
  checkFavorite: () => false,
  setAccount: () => {},
  hideFavorite: false,
  setHideFavorite: () => {},
};
const AuthContext = createContext(defaultValue);
export default AuthContext;
