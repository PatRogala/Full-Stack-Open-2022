import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td><td>{value}</td>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr><StatisticLine text='good' value={good} /></tr>
          <tr><StatisticLine text='neutral' value={neutral} /></tr>
          <tr><StatisticLine text='bad' value={bad} /></tr>
          <tr><StatisticLine text='all' value={good + neutral + bad} /></tr>
          <tr><StatisticLine text='average' value={(good - bad) / (good + neutral + bad)} /></tr>
          <tr><StatisticLine text='positive' value={good / (good + neutral + bad) * 100} /></tr>
        </tbody>
      </table>
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App