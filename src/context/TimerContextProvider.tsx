import { ReactNode, useEffect, useState } from "react";
import TimerContext from "./TimerContext";
import Timer from "../models/Timer";
import { Step } from "../models/Directions";
import { getRecipeSteps } from "../services/recipeApiService";

interface Props {
  children: ReactNode;
}

const TimerContextProvider = ({ children }: Props) => {
  const [timers, setTimers] = useState<Timer[]>([]);

  const addTimers = (id: string): void => {
    getRecipeSteps(id).then((res) => {
      // setSteps(res[0].steps);
      // console.log(res);
      const newTimers: Timer[] = [];
      // timers = [];
      res[0].steps.forEach((step) => {
        if (step?.length !== undefined) {
          const timer: Timer = {
            step: step.number,
            secondsGoneBy: 0,
            maximumSeconds: step.length?.number! * 60,
            timerStarted: false,
            timeLeftOffAtMs: 0,
          };
          newTimers.push(timer);
          setTimers(newTimers);
        }
      });
    });
  };

  const startTimer = (index: number): void => {
    setTimers((prev) => {
      const copy = { ...prev[index] };
      copy.timerStarted = true;
      copy.timeLeftOffAtMs = new Date().getTime();
      return [...prev.slice(0, index), copy, ...prev.slice(index + 1)];
    });
  };

  const updateTimer = (index: number): void => {
    setTimers((prev) => {
      const copy = { ...prev[index] };
      if (copy.timeLeftOffAtMs !== 0 && copy.timerStarted) {
        copy.secondsGoneBy += Math.round(
          (new Date().getTime() - copy.timeLeftOffAtMs) / 1000
        );
        copy.timeLeftOffAtMs = new Date().getTime();
      }
      return [...prev.slice(0, index), copy, ...prev.slice(index + 1)];
    });
  };

  const pauseTimer = (index: number): void => {
    setTimers((prev) => {
      const copy = { ...prev[index] };
      if (copy.timeLeftOffAtMs !== 0 && copy.timerStarted) {
        copy.secondsGoneBy += Math.round(
          (new Date().getTime() - copy.timeLeftOffAtMs) / 1000
        );
      }
      copy.timerStarted = false;
      return [...prev.slice(0, index), copy, ...prev.slice(index + 1)];
    });
  };

  useEffect(() => {}, []);

  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimers,
        startTimer,
        pauseTimer,
        updateTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;
