import { useContext, useEffect, useState } from "react";
import "./InfoCard.css";
import NutritionFacts, { NutrientObjects } from "../models/NutritionFacts";
import {
  getIngredientsById,
  getNutritionById,
  getPriceById,
  getEquipmentById,
  getRecipeById,
} from "../services/recipeApiService";
import { useNavigate, useParams } from "react-router-dom";
import Ingredient from "../models/Ingredient";
import Price from "../models/Price";
import RecipeInfo from "../models/RecipeInfo";
import CurrentRecipeContext from "../context/CurrentRecipeContext";
import TimerContext from "../context/TimerContext";
import Equipment from "../models/Equipment";
const InfoCard = () => {
  const [nutritionInfo, setNutritionInfo] = useState<NutritionFacts>({
    nutrients: [],
  });
  const [priceInfo, setPriceInfo] = useState<Price>({
    ingredients: [],
    totalCost: 0,
    totalCostPerServing: 0,
  });
  const [ingredients, setingredients] = useState<Ingredient>({
    ingredients: [{ name: "", amount: { us: { unit: "", value: 0 } } }],
  });
  const [equipment, setEquipment] = useState<Equipment>({
    equipment: [{ name: "" }],
  });
  const [recipe, setRecipe] = useState<RecipeInfo>({
    id: "",
    title: "",
    instructions: "",
    image: "",
  });
  const navigate = useNavigate();
  const id: string = useParams().id!;

  const { setCurrentRecipeId, currentRecipeId } =
    useContext(CurrentRecipeContext);
  const { addTimers } = useContext(TimerContext);

  useEffect(() => {
    if (id) {
      getNutritionById(id).then((res) => {
        setNutritionInfo(res);
      });
      if ((currentRecipeId && id !== currentRecipeId) || !currentRecipeId) {
        setCurrentRecipeId(id);
        addTimers(id);
      }
    }
  }, [id]);

  useEffect(() => {
    getNutritionById(id).then((res) => {
      setNutritionInfo(res);
    });
    getPriceById(id).then((res) => {
      setPriceInfo(res);
    });
    getIngredientsById(id).then((res) => {
      setingredients(res);
    });
    getEquipmentById(id).then((res) => {
      setEquipment(res);
    });
    getRecipeById(id).then((res) => {
      setRecipe(res);
    });
  }, []);

  const nutritionArray: NutrientObjects[] = nutritionInfo.nutrients.filter(
    (nutrient) => {
      if (
        nutrient.name === "Calories" ||
        nutrient.name === "Fat" ||
        nutrient.name === "Cholesterol" ||
        nutrient.name === "Sodium" ||
        nutrient.name === "Protein" ||
        nutrient.name === "Sugar" ||
        nutrient.name === "Net Carbohydrates" ||
        nutrient.name === "Vitamin D" ||
        nutrient.name === "Iron" ||
        nutrient.name === "Potassium" ||
        nutrient.name === "Calcium"
      ) {
        return nutrient;
      }
    }
  );

  return (
    <section className="InfoCard">
      <div className="step-by-step">
        <div className="picture-div">
          <h2>Get your recipe step-by-step</h2>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <div className="button-div">
          <button onClick={() => navigate(`/steps/rundown/${id}`)}>
            All Steps
          </button>
          <button onClick={() => navigate(`/steps/${id}`)}>Step by Step</button>
        </div>
      </div>

      <div className="nutrition-div">
        <h2>Nutrition Facts</h2>
        <div className="nutrition">
          <p>
            Calories: {nutritionArray[0]?.amount || 0}
            {nutritionArray[0]?.unit || ""}
          </p>
          <p>
            Fat: {nutritionArray[1]?.amount || 0}
            {nutritionArray[1]?.unit || ""}
          </p>
          <p>
            Cholestorol: {nutritionArray[2]?.amount || 0}
            {nutritionArray[2]?.unit || ""}
          </p>
          <p>
            Sodium: {nutritionArray[3]?.amount || 0}
            {nutritionArray[3]?.unit || ""}
          </p>
          <p>
            Protein: {nutritionArray[4]?.amount || 0}
            {nutritionArray[4]?.unit || ""}
          </p>
          <p>
            Sugar: {nutritionArray[5]?.amount || 0}
            {nutritionArray[5]?.unit || ""}
          </p>
          <p>
            Net Carbohydrates: {nutritionArray[6]?.amount || 0}
            {nutritionArray[6]?.unit || ""}
          </p>
          <p>
            Vitamin D: {nutritionArray[7]?.amount || 0}
            {nutritionArray[7]?.unit || ""}
          </p>
          <p>
            Iron: {nutritionArray[8]?.amount || 0}
            {nutritionArray[8]?.unit || ""}
          </p>
          <p>
            Potassium: {nutritionArray[9]?.amount || 0}
            {nutritionArray[9]?.unit || ""}
          </p>
          <p>
            Calcium: {nutritionArray[10]?.amount || 0}
            {nutritionArray[10]?.unit || ""}
          </p>
        </div>
      </div>

      <div className="items-needed">
        <h2>What you'll need</h2>
        <div className="items">
          <div className="ingedients-div">
            <h3>Ingredients</h3>
            {ingredients.ingredients.map((item, index) => {
              return (
                <p key={index}>
                  {item.amount.us.value} {item.amount.us.unit} {item.name}
                </p>
              );
            })}
          </div>
          <div className="equipment-div">
            <h3>Equipment</h3>
            {equipment.equipment.map((item, index) => {
              return <p key={index}>{item.name}</p>;
            })}
          </div>
        </div>
      </div>
      <div className="price-div">
        <h2>Price Breakdown</h2>
        <div>
          {priceInfo.ingredients.map((items, index) => {
            return (
              <div className="prices">
                <span className="bolder">
                  Measurement {index + 1} : {items.amount.us.value}{" "}
                  {items.amount.us.unit}
                </span>
                <span className="bolder">Ingredient: {items.name} </span>
                <span className="bold">
                  Cost: ${(items.price / 100).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
        <p>Total Cost: ${(priceInfo.totalCost / 100).toFixed(2)}</p>
        <p>
          Total Cost Per Serving: $
          {(priceInfo.totalCostPerServing / 100).toFixed(2)}
        </p>
      </div>
    </section>
  );
};
export default InfoCard;
