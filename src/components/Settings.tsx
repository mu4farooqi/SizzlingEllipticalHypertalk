import React, { useState } from "react";

interface SettingsProps {
  onStartSession: (tables: number[]) => void;
}

function Settings({ onStartSession }: SettingsProps) {
  const [selectedTables, setSelectedTables] = useState<number[]>([]);

  const handleTableToggle = (table: number) => {
    setSelectedTables((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table],
    );
  };

  const handleStartSession = () => {
    if (selectedTables.length > 0) {
      onStartSession(selectedTables);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Select Tables
      </h2>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {Array.from({ length: 19 }, (_, i) => i + 2).map((table) => (
          <label key={table} className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={selectedTables.includes(table)}
              onChange={() => handleTableToggle(table)}
            />
            <span className="ml-2 text-gray-700">{table}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleStartSession}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Start Session
      </button>
    </div>
  );
}

export default Settings;
