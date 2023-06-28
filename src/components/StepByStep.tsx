import { useContext, useEffect, useState } from "react";
import "./StepByStep.css";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById, getRecipeSteps } from "../services/recipeApiService";
import { Step } from "../models/Directions";
import StepCard from "./StepCard";
import TimerContext from "../context/TimerContext";
import CurrentRecipeContext from "../context/CurrentRecipeContext";
import { addRating } from "../services/ratingApiService";
import AuthContext from "../context/AuthContext";
import Recipe from "../models/Recipe";

const StepByStep = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState<number>(0);
  const [singleRecipe, setSingleRecipe] = useState<Recipe | null>(null);

  const navigate = useNavigate();
  const id: string = useParams().id!;
  const { addTimers, timers } = useContext(TimerContext);
  const { currentRecipeId, setCurrentRecipeId } =
    useContext(CurrentRecipeContext);
  const { account } = useContext(AuthContext);

  useEffect(() => {
    getRecipeSteps(id).then((res) => {
      setSteps(res[0].steps);
      if ((currentRecipeId && id !== currentRecipeId) || !currentRecipeId) {
        setCurrentRecipeId(id);
        addTimers(id);
      }
    });
    getRecipeById(id).then((res) => {
      setSingleRecipe(res);
    });
  }, [id]);

  const ratingFunction = () => {
    addRating({
      stars: rating,
      recipeId: id,
    });
    setClicked([false, false, false, false, false]);
  };
  return (
    <section className="StepByStep">
      <div className="directions">
        <div className="directions-container">
          {steps.length === currentStep && (
            <div className="rating">
              <div className="rating-left">
                {steps.length === currentStep && <h2>Leave a rating</h2>}
                <div className="star-container">
                  {clicked[0] !== true ? (
                    <i
                      className="fa-regular fa-star star"
                      onClick={() => {
                        setClicked([true, false, false, false, false]);
                        setRating(1);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-star star"
                      onClick={() => {
                        setClicked([true, false, false, false, false]);
                        setRating(1);
                      }}
                    ></i>
                  )}
                  {clicked[1] !== true ? (
                    <i
                      className="fa-regular fa-star star"
                      onClick={() => {
                        setClicked([true, true, false, false, false]);
                        setRating(2);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-star star"
                      onClick={() => {
                        setClicked([true, true, false, false, false]);
                        setRating(2);
                      }}
                    ></i>
                  )}
                  {clicked[2] !== true ? (
                    <i
                      className="fa-regular fa-star star"
                      onClick={() => {
                        setClicked([true, true, true, false, false]);
                        setRating(3);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-star star"
                      onClick={() => {
                        setClicked([true, true, true, false, false]);
                        setRating(3);
                      }}
                    ></i>
                  )}
                  {clicked[3] !== true ? (
                    <i
                      className="fa-regular fa-star star"
                      onClick={() => {
                        setClicked([true, true, true, true, false]);
                        setRating(4);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-star star"
                      onClick={() => {
                        setClicked([true, true, true, true, false]);
                        setRating(4);
                      }}
                    ></i>
                  )}
                  {clicked[4] !== true ? (
                    <i
                      className="fa-regular fa-star star"
                      onClick={() => {
                        setClicked([true, true, true, true, true]);
                        setRating(5);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-star star"
                      onClick={() => {
                        setClicked([true, true, true, true, true]);
                        setRating(5);
                      }}
                    ></i>
                  )}
                </div>
                <button className="rate-button" onClick={ratingFunction}>
                  Add Rating
                </button>
              </div>
              <div className="rating-right last-image">
                <img src={singleRecipe?.image} alt="food" />
              </div>
            </div>
          )}
          {steps.map((step, index) => {
            return (
              currentStep === index && (
                <StepCard
                  key={index}
                  index={
                    timers.findIndex((timer) => timer.step === step.number) || 0
                  }
                  step={step}
                />
              )
            );
          })}
        </div>
        <div className="button-container">
          <button
            disabled={currentStep === 0}
            onClick={() => {
              setCurrentStep(currentStep - 1);
            }}
          >
            previous step
          </button>
          <button onClick={() => navigate(`/`)}>Back to Home Page</button>
          <button onClick={() => navigate(`/steps/all/${id}`)}>
            See all Timers
          </button>
          <button onClick={() => navigate(`/${id}`)}>Back to Info Page</button>
          <button
            className="next"
            disabled={steps.length === currentStep}
            onClick={() => {
              setCurrentStep(currentStep + 1);
            }}
          >
            next step
          </button>
        </div>
      </div>
    </section>
  );
};

export default StepByStep;
