import "./About.css"


import React from 'react'

function About() {
  return (
    <main className="content">

      <div className="todo-box about-box">

        <h1 className="about-title">
          About ToDo
        </h1>

        <p className="about-text">
          A to-do list is a list of items that <span>need to be completed</span>. The items on the list can range from simple activities
          like replying to an email, to more complex tasks like creating project briefs.
        </p>

        <p className="about-text">
          The items on a to-do list are usually <span>action-oriented</span>, such as “Schedule a meet with the R&D team” or “Call
          back customer X.” Some lists include more abstract goals, such as “improve your time management skills” or
          “learn how to use a new software program.”
        </p>

      </div>

    </main>
  )
}

export default About