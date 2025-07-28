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
    if (playerNames.some((name) => name.trim() === "")) {
      alert("Please enter all player names.");
      return;
    }

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

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
}

// ✅ Full rules now included
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

          <div className="space-y-4 text-left text-gray-800">
            <section>
              <h3 className="text-lg font-bold text-blue-600">🎯 Objective</h3>
              <p>
                Be the last player with money by buying properties and collecting rent from other players.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-blue-600">🎲 Game Setup</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Each player starts with $1,500</li>
                <li>All players begin at GO</li>
                <li>Turns rotate in order</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-blue-600">🎮 Gameplay</h3>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Roll two dice and move your token</li>
                <li>Buy any unowned property you land on</li>
                <li>Pay rent if you land on another player's property</li>
                <li>Collect $200 each time you pass GO</li>
              </ol>
            </section>

            <section>
              <h3 className="text-lg font-bold text-blue-600">🏠 Properties</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Buy properties to collect rent</li>
                <li>Your color will show on owned properties</li>
                <li>You can't buy if you don't have enough money</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-blue-600">💡 Special Tiles</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li><strong>GO:</strong> Collect $200 when passing</li>
                <li><strong>Jail:</strong> Stuck for 2 turns unless skipped</li>
                <li><strong>Chance / Community Chest:</strong> Draw a random card</li>
                <li><strong>Free Parking:</strong> Safe zone</li>
                <li><strong>Go To Jail:</strong> Go directly to jail</li>
              </ul>
            </section>
          </div>

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

