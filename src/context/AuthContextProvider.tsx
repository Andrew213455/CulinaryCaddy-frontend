import { ReactNode, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import Account from "../models/Account";
import { addAccount, getAccountById } from "../services/accountApiService";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

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
    let fave = false;
    account?.favorites.map((recipe) => {
      if (recipe.id === id) {
        fave = true;
      }
    });
    return fave;
  };

  return (
    <AuthContext.Provider value={{ user, account, checkFavorite, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
