import React from "react"
import { render } from "@testing-library/react"
import Game from "./Game"

test("renders new word button", () => {
  const { getByText } = render(<Game />)
  const linkElement = getByText(/new word/i)
  expect(linkElement).toBeInTheDocument()
})
