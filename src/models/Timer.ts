export default interface Timer {
  step: number;
  secondsGoneBy: number;
  maximumSeconds: number;
  timerStarted: boolean;
  timeLeftOffAtMs: number;
}
