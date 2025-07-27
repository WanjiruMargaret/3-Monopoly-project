🏠 Monopoly Game
A web-based digital version of the classic Monopoly board game, built using React. This project simulates turn-based gameplay with rolling dice, buying properties, collecting rent, and more.

📌 Features
🎲 Roll Dice to move around the board

🧍‍♂️ Multiple Players take turns in a sequence

🏡 Buy Properties if unowned and you land on them

💸 Pay Rent when you land on another player’s property

🚓 Go to Jail and skip turns

🪙 Chance and 💌 Community Chest cards (basic effects added)

💀 Bankruptcy Handling – players with $0 can't move

💾 (Optional): Save state with localStorage (coming soon)

🧑‍🤝‍🧑 Team Members
Name	Role
Maggie	🧠 Game Logic Developer, Scrum Master
Emmanuel	🔁 Game State Manager (Optional Backend)
Julius	💅 UI/UX Design Lead
Wayne	🧪 Testing & Debugging

🛠 Tech Stack
React (Functional Components + Hooks)

JavaScript

CSS (Board Layout and Tile Styling)

Vite (for fast bundling)

JSON files for tile and property data

LocalStorage (planned for game persistence)

📁 File Structure
css
Copy
Edit
src/
├── App.jsx
├── Components/
│   ├── Board/
│   │   ├── Board.jsx
│   │   └── Tile.jsx
│   ├── Dice/
│   │   └── DiceForm.jsx
│   └── Player/
│       └── PlayerPanel.jsx
├── constants/
│   └── tiles.js
├── utils/
│   ├── gameUtils.js
│   ├── MovePlayer.js
│   └── GameLogic.js
└── style/
    └── board.css
▶️ Getting Started
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/monopoly-game.git
cd monopoly-game
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the App
bash
Copy
Edit
npm run dev
🧠 Game Logic (Overview)
Uses useState to manage:

Player turns

Dice rolls

Property ownership

Player positions and cash

Key logic functions:

rollDice() — returns 2 random dice values

handlePlayerMove() — moves player based on roll

handleTileAction() — performs logic (rent, buy, jail, etc.)

📦 Future Improvements
Full support for house upgrades / hotels

Drag-and-drop player movement

Multiplayer over network (Socket.io)

Save/Resume game via localStorage or Firebase

✅ MVP Achievements
Basic movement

Dice roll functionality

Buying & owning properties

Paying rent

Chance / Community logic (placeholder and effects)

Skip turn when in jail

Bankruptcy check

📝 License
This project is for educational purposes only.