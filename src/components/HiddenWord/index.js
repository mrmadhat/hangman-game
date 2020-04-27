import React from "react"

import "./HiddenWord.css"

const HiddenWord = ({ currentWord, knownLetters }) => {
  return (
    <div className="hidden-word">
      {currentWord.map((letter, ind) => (
        <div key={ind}>
          {knownLetters.includes(letter) ? (
            <span className="hidden-letter hidden-letter--known">{letter}</span>
          ) : (
            <span className="hidden-letter hidden-letter--unknown"></span>
          )}
        </div>
      ))}
    </div>
  )
}

export default HiddenWord
