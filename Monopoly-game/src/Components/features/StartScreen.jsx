import { useState } from 'react';

export default function StartScreen({ onStartGame }) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🎲 MONOPOLY 🏠</h1>
        <p className="text-gray-600 mb-8">The Classic Property Trading Game</p>

        <div className="space-y-4 , start-screen">
          <button
            onClick={onStartGame}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">📖 How to Play Monopoly</h2>
                <button
                  onClick={() => setShowRules(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-left">
                <section>
                  <h3 className="text-lg font-bold text-blue-600">🎯 Objective</h3>
                  <p>Be the last player remaining with money by buying properties and collecting rent from other players.</p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-blue-600">🎲 Game Setup</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Each player starts with $1,500</li>
                    <li>All players begin at GO</li>
                    <li>Players take turns in order</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-blue-600">🎮 How to Play</h3>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>Roll the dice to move around the board</li>
                    <li>Buy unowned properties you land on</li>
                    <li>Collect rent when others land on your properties</li>
                    <li>Collect $200 when you pass GO</li>
                  </ol>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-blue-600">🏠 Properties</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Click on unowned properties to buy them</li>
                    <li>Property prices are shown on each space</li>
                    <li>Owned properties show the owner's color</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-blue-600">🎯 Special Spaces</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li><strong>GO:</strong> Collect $200 when you pass or land on it</li>
                    <li><strong>Jail:</strong> Just visiting (no penalty)</li>
                    <li><strong>Free Parking:</strong> Nothing happens</li>
                    <li><strong>Go to Jail:</strong> Move directly to Jail</li>
                  </ul>
                </section>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowRules(false)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Got it! Let's Play
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
