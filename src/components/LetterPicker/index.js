import React from "react"
import "./LetterPicker.css"
import Button from "../Button"

const LetterPicker = ({ choices, onClick }) => (
  <div className="letter-picker-wrap">
    <h2>Pick a letter</h2>
    <div className="letter-picker">
      {choices.map((letter, ind) => (
        <Button
          key={ind}
          className="button--letter-picker"
          onClick={() => onClick(letter)}
        >
          <span>{letter}</span>
        </Button>
      ))}
    </div>
  </div>
)

export default LetterPicker
