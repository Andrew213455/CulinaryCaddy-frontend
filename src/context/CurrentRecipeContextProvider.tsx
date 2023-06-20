import { ReactNode, useEffect, useState } from "react";
import TimerContext from "./TimerContext";
import Timer from "../models/Timer";
import { Step } from "../models/Directions";
import { getRecipeSteps } from "../services/recipeApiService";
import CurrentRecipeContext from "./CurrentRecipeContext";

interface Props {
  children: ReactNode;
}

const CurrentRecipeContextProvider = ({ children }: Props) => {
  const [currentRecipeId, setCurrentRecipeId] = useState<null | string>(null);

  return (
    <CurrentRecipeContext.Provider
      value={{ currentRecipeId, setCurrentRecipeId }}
    >
      {children}
    </CurrentRecipeContext.Provider>
  );
};

export default CurrentRecipeContextProvider;
