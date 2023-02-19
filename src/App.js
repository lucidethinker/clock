import React, { useState, useEffect } from 'react';
import usePomodoroStore from './store/usePomodoroStore';
import Header from './components/Header';
import Footer from './components/Footer';
import './style/style.css'

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);

  const { timeLeft, breakTimeLeft, isRunning, startTimer, stopTimer, resetTimer, decrementTime } = usePomodoroStore();

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        decrementTime();
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, decrementTime]);

  useEffect(() => {
    if (isBreak) {
      setSeconds(breakTimeLeft);
    } else {
      setSeconds(timeLeft);
    }
  }, [isBreak, timeLeft, breakTimeLeft]);

  const start = () => {
    startTimer();
  };

  const stop = () => {
    stopTimer();
  };

  const reset = () => {
    resetTimer();
    setSeconds(timeLeft);
    setIsBreak(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (

    <div >

      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <h1 className="text-4xl font-bold mb-4">{isBreak ? 'BREAK' : 'WORK'} TIME</h1>
      <div className="text-6xl font-bold mb-4">{formatTime(seconds)}</div>
      <div className="flex gap-5">
        {!isRunning ? (
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={start}>Start</button>
        ) : (
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={stop}>Stop</button>
        )}
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={reset}>Reset</button>
      </div>
    </div>
      
      <Footer />
    </div>
  );
}

export default App;
