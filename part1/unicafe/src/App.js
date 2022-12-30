import {useState} from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({good, neutral, bad, total}) => {
    if (total === 0) {
        return (
            <>
                <p>No feedback given</p>
            </>
        )
    }

    return (
        <>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/>
            <StatisticLine text='all' value={total}/>
            <StatisticLine text='average' value={(good - bad) / total}/>
            <StatisticLine text='positive' value={good / total * 100 + '%'}/>
        </>
    )
}

const StatisticLine = ({text, value}) => (
    <p>{text} {value}</p>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const total = good + neutral + bad

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text='good'/>
            <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
            <Button handleClick={() => setBad(bad + 1)} text='bad'/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
        </div>
    )
}

export default App