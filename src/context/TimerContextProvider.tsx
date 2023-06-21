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

      return [...prev.slice(0, index), copy, ...prev.slice(index + 1)];
    });
  };

  const pauseTimer = (index: number): void => {
    setTimers((prev) => {
      const copy = { ...prev[index] };
      copy.timerStarted = false;
      return [...prev.slice(0, index), copy, ...prev.slice(index + 1)];
    });
  };

  const resetTimer = (index: number): void => {
    setTimers((prev) => {
      const copy = { ...prev[index] };
      copy.timerStarted = false;
      copy.secondsGoneBy = 0;
      return [...prev.slice(0, index), copy, ...prev.slice(index + 1)];
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const copyOfTimers = [...prev];
        copyOfTimers.forEach((timer) => {
          if (timer.timerStarted) {
            timer.secondsGoneBy++;
          }
        });
        return copyOfTimers;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimers,
        startTimer,
        pauseTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;
