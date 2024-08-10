import React, { useState, useEffect } from "react";
import Question from "./Question";

interface SessionProps {
  tables: number[];
  onEndSession: () => void;
}

function Session({ tables, onEndSession }: SessionProps) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<[number, number]>([
    0, 0,
  ]);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const randomTable = tables[Math.floor(Math.random() * tables.length)];
    const randomMultiplier = Math.floor(Math.random() * 10) + 1;
    setCurrentQuestion([randomTable, randomMultiplier]);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }
    generateNewQuestion();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Session</h2>
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <span className="text-green-600 font-bold">
          {correctAnswers} correct
        </span>
        <span className="mx-2">|</span>
        <span className="text-red-600 font-bold">{wrongAnswers} wrong</span>
      </div>
      <Question
        multiplicand={currentQuestion[0]}
        multiplier={currentQuestion[1]}
        onAnswer={handleAnswer}
      />
      <button
        onClick={onEndSession}
        className="mt-6 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        End Session
      </button>
    </div>
  );
}

export default Session;
