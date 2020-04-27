import React, { useState, useEffect, useCallback } from "react"

import uniq from "lodash.uniq"
import shuffle from "lodash.shuffle"

import "./Game.css"
import Button from "./components/Button"
import LivesRemaining from "./components/LivesRemaining"
import HiddenWord from "./components/HiddenWord"
import LetterPicker from "./components/LetterPicker"

import words from "./words.json"

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "x",
  "y",
  "z",
]

const defaultLives = 10
const minWordLength = 4
const maxWordLength = 8

const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)]

function Game() {
  const [knownLetters, setKnownLetters] = useState([])
  const [currentWord, setCurrentWord] = useState([])
  const [choices, setChoices] = useState([])
  const [livesRemaining, setLivesRemaining] = useState(defaultLives)
  const [notify, setNotify] = useState(false)

  const generateChoices = useCallback(
    (nextKnownLetters = []) => {
      if (!currentWord.length) return nextKnownLetters

      const unknownLetters = currentWord.filter(
        (letter) => !nextKnownLetters.includes(letter)
      )
      const correctChoice = getRandomItem(unknownLetters)

      const badLetters = alphabet.filter(
        (letter) => !currentWord.includes(letter)
      )
      const badChoices = shuffle(badLetters).splice(0, 5)

      return shuffle([correctChoice, ...badChoices])
    },
    [currentWord]
  )

  const resetGame = useCallback(() => {
    setCurrentWord(pickWord())
    setLivesRemaining(defaultLives)
    setChoices(generateChoices())
    setKnownLetters([])
  }, [generateChoices])

  useEffect(() => {
    if (!currentWord.length) {
      resetGame()
    }

    if (!choices.length) {
      // console.log(currentWord)
      setChoices(generateChoices())
    }
  }, [currentWord, choices, resetGame, setChoices, generateChoices])

  const pickWord = () => {
    let word = getRandomItem(words)

    while (word.length > maxWordLength || word.length < minWordLength) {
      word = getRandomItem(words)
    }

    return word.split("")
  }

  const checkLetter = (letter) => {
    const nextKnownLetters = knownLetters

    if (currentWord.includes(letter)) {
      setNotify("correct")
      nextKnownLetters.push(letter)
    } else {
      setNotify("incorrect")
      setLivesRemaining(livesRemaining - 1)
    }

    setKnownLetters(nextKnownLetters)
    setChoices(generateChoices(nextKnownLetters))

    setTimeout(() => setNotify(false), 1000)
  }

  const identifiedWord = knownLetters.length === uniq(currentWord).length
  const showLetterPicker = !notify && !identifiedWord && livesRemaining

  return (
    <div className="Game">
      <header className="Game-header">
        <LivesRemaining lives={livesRemaining} />
        <Button onClick={resetGame}>New Word</Button>
      </header>

      <h1 data-testid="title">Can you guess the word?</h1>

      <HiddenWord knownLetters={knownLetters} currentWord={currentWord} />

      {!!showLetterPicker && (
        <LetterPicker choices={choices} onClick={checkLetter} />
      )}

      {notify === "incorrect" && !!livesRemaining && (
        <p>
          Whoops! <br /> {livesRemaining} lives remaining
        </p>
      )}

      {!identifiedWord && notify === "correct" && (
        <p>
          Awesome, you got
          <br /> a letter!
        </p>
      )}

      {identifiedWord && (
        <>
          <p>
            You guessed the word, <br /> Congratulations!
          </p>
          <Button onClick={resetGame}>Play Again?</Button>
        </>
      )}

      {!livesRemaining && (
        <>
          <p>
            You have no lives left, <br /> better luck next time
          </p>
          <Button onClick={resetGame}>Play Again?</Button>
        </>
      )}
    </div>
  )
}

export default Game
