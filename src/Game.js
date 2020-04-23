import React from "react"
import "./Game.css"
import Button from "./components/Button"

function Game() {
  return (
    <div className="Game">
      <header className="Game-header">
        <Button onClick={() => alert("hello")}>New </Button>
      </header>
    </div>
  )
}

export default Game
