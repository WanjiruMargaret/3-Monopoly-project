import React from "react";
import "./Dice.css";

export default function DiceForm({ dice, onRoll }) {
  return (
    <div className="dice">
      <p>Dice Roll: 🎲 {dice[0]} and {dice[1]}</p>
      <button onClick={onRoll}>Roll Dice</button>
    </div>
  );
}
