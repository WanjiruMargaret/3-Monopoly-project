

import { useState } from "react";

export default function StartScreen({ onStartGame }) {
  const [showRules, setShowRules] = useState(false);
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(["", ""]);

  const handlePlayerCountChange = (e) => {
    const count = Number(e.target.value);
    setPlayerCount(count);
    setPlayerNames((names) => {
      const newNames = [...names];
      while (newNames.length < count) newNames.push("");
      while (newNames.length > count) newNames.pop();
      return newNames;
    });
  };

  const handleNameChange = (index, e) => {
    const newNames = [...playerNames];
    newNames[index] = e.target.value;
    setPlayerNames(newNames);
  };

  const handleStart = () => {
    // Validate names
    if (playerNames.some((name) => name.trim() === "")) {
      alert("Please enter all player names.");
      return;
    }

    // Prepare players config with colors (example color array)
    const colors = ["red", "blue", "green", "yellow"];
    const playersConfig = playerNames.map((name, i) => ({
      id: i + 1,
      name: name.trim(),
      balance: 1500,
      position: 0,
      properties: [],
      isBankrupt: false,
      turnsInJail: 0,
      color: colors[i] || "gray",
    }));

    onStartGame(playersConfig);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🎲 MONOPOLY 🏠</h1>
        <p className="text-gray-600 mb-8">The Classic Property Trading Game</p>

        <div className="mb-6 text-left">
          <label className="block mb-2 font-semibold text-gray-700">
            Number of Players
          </label>
          <select
            value={playerCount}
            onChange={handlePlayerCountChange}
            className="w-full border rounded px-3 py-2"
          >
            {[2, 3, 4].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 text-left space-y-4">
          {playerNames.map((name, idx) => (
            <div key={idx}>
              <label className="block mb-1 font-semibold text-gray-700">
                Player {idx + 1} Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(idx, e)}
                placeholder={`Player ${idx + 1}`}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4 start-screen">
          <button
            onClick={handleStart}
            className="start-button w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            🎯 Start Game
          </button>

          <button
            onClick={() => setShowRules(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            📖 How to Play
          </button>
        </div>
      </div>

      {showRules && (
        <RulesModal onClose={() => setShowRules(false)} />
      )}
    </div>
  );
}

// Extract the rules modal to keep code clean
function RulesModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">📖 How to Play Monopoly</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* ... rules content here ... */}
          <p>...</p>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Got it! Let's Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
