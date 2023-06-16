import { createContext } from "react";
import Timer from "../models/Timer";
import { Step } from "../models/Directions";

interface TimerContextModel {
  timers: Timer[];
  addTimers: (steps: Step[]) => void;
  startTimer: (index: number) => void;
}

const defaultValues: TimerContextModel = {
  timers: [],
  addTimers: () => {},
  startTimer: () => {},
};

const TimerContext = createContext(defaultValues);

export default TimerContext;
