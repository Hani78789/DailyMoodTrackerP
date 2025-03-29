import React from 'react'
import Header from '../Header'
import MoodCalendar from '../MoodCalendar'
import './index.css'

const Home = ({daysList, emojisList, initialMonthsList, ...props}) => {
  console.log('Days List:', daysList)
  console.log('Emojis List:', emojisList)
  console.log('Months List:', initialMonthsList)

  return (
    <div className="home-container">
      <Header />
      <MoodCalendar
        monthsList={initialMonthsList}
        daysList={daysList}
        emojisList={emojisList}
      />
    </div>
  )
}

export default Home
