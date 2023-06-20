import { createContext } from "react";
import Timer from "../models/Timer";
import { Step } from "../models/Directions";

interface CurrentRecipeContextModel {
  currentRecipeId: string | null;
  setCurrentRecipeId: (id: string) => void;
}

const defaultValues: CurrentRecipeContextModel = {
  currentRecipeId: null,
  setCurrentRecipeId: () => {},
};

const CurrentRecipeContext = createContext(defaultValues);

export default CurrentRecipeContext;
