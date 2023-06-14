import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  getNutritionById,
  getRandomRecipes,
} from "./services/recipeApiService";

function App() {
  getRandomRecipes().then((res) => {
    console.log(res);
  });
  getNutritionById(1003464).then((res) => {
    console.log(res);
  });

  return <div className="App"></div>;
}

export default App;
