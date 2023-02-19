import {create} from 'zustand';

const usePomodoroStore = create((set) => ({
  timeLeft: 25 * 60, // initial time left in seconds
  breakTimeLeft: 5 * 60, // initial break time left in seconds
  isRunning: false, // whether the timer is currently running
  isBreak: false, // whether it is currently break time
  breakLength: 5, // break length in minutes
  sessionLength: 25, // session length in minutes
  startTimer: () => {
    set({ isRunning: true });
  },
  stopTimer: () => {
    set({ isRunning: false });
  },
  resetTimer: () => {
    set({ 
      timeLeft: 25 * 60,
      breakTimeLeft: 5 * 60,
      isRunning: false,
      isBreak: false
    });
  },
  decrementTime: () => {
    set((state) => {
      const timeLeft = state.timeLeft - 1;
      const isBreak = timeLeft <= 0;
      return {
        timeLeft: isBreak ? state.breakTimeLeft : timeLeft,
        isBreak,
      };
    });
  },
  setBreakLength: (length) => {
    set({ breakLength: length, breakTimeLeft: length * 60 });
  },
  setSessionLength: (length) => {
    set({ sessionLength: length, timeLeft: length * 60 });
  },
}));

export default usePomodoroStore;
