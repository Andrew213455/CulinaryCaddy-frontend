import { FormEvent, useContext, useEffect, useState } from "react";
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
import AuthContext from "../context/AuthContext";
import {
  addFavorite,
  addNote,
  deleteFavorite,
  getAccountById,
} from "../services/accountApiService";
import Recipe from "../models/Recipe";
import Notes from "../models/Notes";
const InfoCard = () => {
  const [isFave, setIsFave] = useState(false);
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
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [note, setNote] = useState("");

  const navigate = useNavigate();
  const id: string = useParams().id!;
  const { setCurrentRecipeId, currentRecipeId } =
    useContext(CurrentRecipeContext);
  const { addTimers } = useContext(TimerContext);
  const { account, checkFavorite, setAccount } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
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
  }, [id]);

  useEffect(() => {
    if (recipe && account) {
      console.log(checkFavorite(recipe.id));

      setIsFave(checkFavorite(recipe.id));
    }
  }, [account, recipe]);

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

  const submitListener = (e: FormEvent) => {
    e.preventDefault();
    addNote(account?.googleId!, {
      recipeId: recipe?.id!,
      note: note,
      title: recipe?.title!,
    }).then((res) => {
      setAccount(res);
    });
  };

  const filteredNote = account?.note.forEach((singleNote) => {
    if (singleNote.recipeId === id) {
      return singleNote;
    }
  });

  console.log(account);

  return (
    <section className="InfoCard">
      {account && (
        <div className="note-div">
          <h2>Notes</h2>
          <form onSubmit={submitListener}>
            <textarea
              className="add-note"
              name="notes"
              id="notes"
              placeholder="add a note!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button>Add Note</button>
          </form>
          {filteredNote !== undefined && <div>{filteredNote}</div>}
        </div>
      )}
      <div className="step-by-step">
        <div className="picture-div">
          <h2>Get your recipe step-by-step</h2>
          <h3>{recipe?.title}</h3>
          <img src={recipe?.image} alt={recipe?.title} />
        </div>
        <div className="button-div">
          <button onClick={() => navigate(`/steps/rundown/${id}`)}>
            All Steps
          </button>
          <div>
            {account && (
              <div className="heart-container">
                {!isFave ? (
                  <i
                    className="fa-regular fa-heart heart"
                    onClick={() =>
                      addFavorite(account?.googleId!, recipe!).then(() => {
                        getAccountById(account.googleId).then((res) => {
                          setAccount(res);
                        });
                      })
                    }
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-heart heart"
                    onClick={() =>
                      deleteFavorite(account?.googleId!, recipe!).then(() => {
                        console.log(account, recipe);
                        getAccountById(account.googleId).then((res) => {
                          setAccount(res);
                        });
                      })
                    }
                  ></i>
                )}
              </div>
            )}
          </div>

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
