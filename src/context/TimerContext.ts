import { createContext } from "react";
import Timer from "../models/Timer";

interface TimerContextModel {
  timers: Timer[];
  addTimers: (id: string) => void;
  startTimer: (index: number) => void;
  pauseTimer: (index: number) => void;
  resetTimer: (index: number) => void;
}

const defaultValues: TimerContextModel = {
  timers: [],
  addTimers: () => {},
  startTimer: () => {},
  pauseTimer: () => {},
  resetTimer: () => {},
};

const TimerContext = createContext(defaultValues);

export default TimerContext;
