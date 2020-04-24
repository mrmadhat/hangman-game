import React from "react"
import clsx from "clsx"

import "./Button.css"

const Button = ({ children, className, ...props }) => {
  return (
    <button className={clsx("button", className)} {...props}>
      {children}
    </button>
  )
}

export default Button
