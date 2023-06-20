import { createContext } from "react";
import Timer from "../models/Timer";

interface TimerContextModel {
  timers: Timer[];
  addTimers: (id: string) => void;
  startTimer: (index: number) => void;
  pauseTimer: (index: number) => void;
  updateTimer: (index: number) => void;
}

const defaultValues: TimerContextModel = {
  timers: [],
  addTimers: () => {},
  startTimer: () => {},
  pauseTimer: () => {},
  updateTimer: () => {},
};

const TimerContext = createContext(defaultValues);

export default TimerContext;
