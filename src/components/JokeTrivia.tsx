import { useEffect, useState } from "react";
import Joke from "../models/Joke";
import "./JokeTrivia.css";
import { getRandomJoke, getRandomTrivia } from "../services/recipeApiService";

const JokeTrivia = () => {
  const [joke, setJoke] = useState<Joke>({ text: "" });
  const [trivia, setTrivia] = useState<Joke>({ text: "" });
  useEffect(() => {
    getRandomJoke().then((res) => {
      setJoke(res);
    });
    getRandomTrivia().then((res) => {
      setTrivia(res);
    });
  }, []);

  return (
    <section className="jokeTriviaContainer">
      <div className="JokeTrivia">
        <button
          onClick={() => {
            getRandomJoke().then((res) => {
              setJoke(res);
            });
            getRandomTrivia().then((res) => {
              setTrivia(res);
            });
          }}
        >
          New joke/trivia
        </button>
        <div className="jokes">
          <h3>Joke</h3>
          {joke.text}
        </div>
        <div className="jokes">
          <h3>Trivia</h3>
          {trivia.text}
        </div>
      </div>
    </section>
  );
};

export default JokeTrivia;
