import React from "react"
import { render, screen } from "@testing-library/react"
import Game from "./Game"

test("renders new word button", () => {
  const { getByText } = render(<Game />)
  const linkElement = getByText(/new word/i)
  expect(linkElement).toBeInTheDocument()
})

test("renders a title", () => {
  const { getByTestId } = render(<Game />)
  const headingElement = getByTestId("title")
  expect(headingElement).toBeInTheDocument()
})
