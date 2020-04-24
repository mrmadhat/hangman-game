import React from "react"
import "./LivesRemaining.css"

const LivesRemaining = ({ lives }) => (
  <div className="live-remaining">
    <span className="lives-remaining__num">{lives}</span>
    <span className="lives-remaining__text">lives</span>
  </div>
)

export default LivesRemaining
