import React from "react"
import "./Game.css"
import Button from "./components/Button"

function Game() {
  return (
    <div className="Game">
      <header className="Game-header">
        <Button onClick={() => alert("hello")}>New Word</Button>
      </header>
      <h1 data-testid="title">Can you guess the word?</h1>
    </div>
  )
}

export default Game
