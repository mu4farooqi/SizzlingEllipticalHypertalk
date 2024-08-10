import React, { useState, useEffect } from "react";

interface QuestionProps {
  multiplicand: number;
  multiplier: number;
  onAnswer: (isCorrect: boolean) => void;
}

function Question({ multiplicand, multiplier, onAnswer }: QuestionProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [multiplicand, multiplier]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === multiplicand * multiplier;

    if (isCorrect) {
      onAnswer(true);
      setUserAnswer("");
      setTimeLeft(15);
    } else {
      setShowAnswer(true);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-3xl font-bold text-center mb-4">
        {multiplicand} × {multiplier} = ?
      </h3>
      <p className="text-center mb-4">
        Time left: <span className="font-bold">{timeLeft}</span> seconds
      </p>
      {showAnswer ? (
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">
            Correct Answer: {multiplicand * multiplier}
          </p>
          <button
            onClick={() => {
              onAnswer(false);
              setShowAnswer(false);
              setUserAnswer("");
              setTimeLeft(15);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={showAnswer}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Question;
