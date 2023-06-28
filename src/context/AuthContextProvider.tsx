import { ReactNode, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import Account from "../models/Account";
import { addAccount, getAccountById } from "../services/accountApiService";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [hideFavorite, setHideFavorite] = useState<boolean>(false);

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      if (newUser) {
        getAccountById(newUser?.uid!).then((res) => {
          if (res) {
            setAccount(res);
          } else {
            const newAccount: Account = {
              googleId: newUser?.uid!,
              name: newUser?.displayName!,
              favorites: [],
              photoURL: newUser?.photoURL!,
            };
            addAccount(newAccount).then((res) => {
              setAccount(res);
            });
          }
        });
      }
    });
  }, []);
  const checkFavorite = (id: string): boolean => {
    if (account) {
      return account?.favorites.some((item) => {
        return item.id === id;
      });
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        account,
        checkFavorite,
        setAccount,
        hideFavorite,
        setHideFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
