import React, { useState, useEffect } from 'react';
import usePomodoroStore from './store/usePomodoroStore';
import Header from './components/Header';
import Footer from './components/Footer';
import './style/style.css'

function App() {
  const [seconds, setSeconds] = useState(0);

  const {
    timeLeft,
    breakTimeLeft,
    isRunning,
    isBreak,
    breakLength,
    sessionLength,
    startTimer,
    stopTimer,
    resetTimer,
    decrementTime,
    setBreakLength,
    setSessionLength,
  } = usePomodoroStore();

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
      <h1 className="text-4xl font-bold mb-4">{isBreak ? "Break" : "Session"} Time</h1>

          
      <div className="flex justify-center space-x-4">
      <div className="text-center">
        <p className="text-lg font-bold">Session Length</p>
        <div className="flex items-center justify-center">
          <button
            className="text-lg font-bold border border-gray-400 rounded-full h-8 w-8 mr-2"
            onClick={() => setSessionLength(sessionLength - 1)}
            disabled={isRunning || sessionLength === 1}
          >
            -
          </button>
          <p className="text-lg font-bold">{sessionLength}</p>
          <button
            className="text-lg font-bold border border-gray-400 rounded-full h-8 w-8 ml-2"
            onClick={() => setSessionLength(sessionLength + 1)}
            disabled={isRunning || sessionLength === 60}
          >
            +
          </button>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold">Break Length</p>
        <div className="flex items-center justify-center">
          <button
            className="text-lg font-bold border border-gray-400 rounded-full h-8 w-8 mr-2"
            onClick={() => setBreakLength(breakLength - 1)}
            disabled={isRunning || breakLength === 1}
          >
            -
          </button>
          <p className="text-lg font-bold">{breakLength}</p>
          <button
            className="text-lg font-bold border border-gray-400 rounded-full h-8 w-8 ml-2"
            onClick={() => setBreakLength(breakLength + 1)}
            disabled={isRunning || breakLength === 60}
          >
            +
          </button>
        </div>
      </div>
    </div>
    
    
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