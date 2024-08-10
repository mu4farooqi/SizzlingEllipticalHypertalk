import React, { useState } from "react";
import Session from "./components/Session";
import Settings from "./components/Settings";

function App() {
  const [sessionActive, setSessionActive] = useState(false);
  const [tables, setTables] = useState<number[]>([]);

  const startSession = (selectedTables: number[]) => {
    setTables(selectedTables);
    setSessionActive(true);
  };

  const endSession = () => {
    setSessionActive(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Math Tables Practice
          </h1>
          {sessionActive ? (
            <Session tables={tables} onEndSession={endSession} />
          ) : (
            <Settings onStartSession={startSession} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
