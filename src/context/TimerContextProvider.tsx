import { ReactNode, useState } from "react";
import TimerContext from "./TimerContext";
import Timer from "../models/Timer";
import { Step } from "../models/Directions";

interface Props {
  children: ReactNode;
}

const TimerContextProvider = ({ children }: Props) => {
  const [timers, setTimers] = useState<Timer[]>([]);
  console.log(timers);
  const addTimers = (steps: Step[]): void => {
    const newTimers: Timer[] = [];
    steps.forEach((step) => {
      if (step?.length !== undefined) {
        const timer: Timer = {
          step: step.number,
          secondsGoneBy: 0,
          maximumSeconds: step.length?.number! * 60,
          timerStarted: false,
          interval: undefined,
        };
        newTimers.push(timer);
      }
    });
    setTimers(newTimers);
  };

  const startTimer = (index: number): void => {
    console.log(index);
    setTimers((prev) => {
      let copy: Timer = { ...prev[index] };
      console.log(copy);
      copy.timerStarted = true;
      copy.interval = setInterval(() => {
        copy.secondsGoneBy++;
      }, 1000);
      return [...prev.slice(0, index), copy, ...prev.slice(index + 1)];
    });
  };

  return (
    <TimerContext.Provider value={{ timers, addTimers, startTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;
