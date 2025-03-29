import {useState} from 'react'
import './index.css'

const MoodCalendar = ({monthsList, daysList, emojisList}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState(null)

  const currentMonth = monthsList[currentMonthIndex]

  // Move this function before it's used
  const resetSelection = () => {
    setSelectedDate(null)
    setSelectedDay('')
    setSelectedEmoji(null)
  }

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentMonthIndex(prev => Math.max(prev - 1, 0))
    resetSelection()
  }

  const goToNextMonth = () => {
    setCurrentMonthIndex(prev => Math.min(prev + 1, monthsList.length - 1))
    resetSelection()
  }

  // Handle date selection
  const handleDateClick = date => {
    setSelectedDate(date)
    const existingEmoji = emojisList.find(e => e.emojiName === date.emojiName)
    if (existingEmoji) {
      setSelectedEmoji(existingEmoji)
    } else {
      setSelectedEmoji(null)
    }
  }

  // Handle emoji selection
  const handleEmojiSelect = emoji => {
    if (!selectedDate) return
    setSelectedEmoji(emoji)
    // ... rest of your emoji selection logic
  }

  // Handle day selection
  const handleDaySelect = day => {
    setSelectedDay(day)
  }

  const getDayOfWeek = dateNum => {
    const date = new Date(2023, currentMonthIndex, dateNum)
    return daysList[date.getDay()].day
  }

  return (
    <div className="mood-calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt; Prev</button>
        <h2>{currentMonth.monthName}</h2>
        <button onClick={goToNextMonth}>Next &gt;</button>
      </div>

      <div className="days-header">
        {daysList.map(day => (
          <div key={day.id} className="day-header">
            {day.day}
          </div>
        ))}
      </div>

      <div className="dates-grid">
        {currentMonth.dates.map(date => {
          const dayOfWeek = getDayOfWeek(parseInt(date.date))
          return (
            <div
              key={date.id}
              className={`date-cell ${
                selectedDate?.id === date.id ? 'selected' : ''
              }`}
              onClick={() => handleDateClick(date)}
              role="button"
              tabIndex="0"
              onKeyDown={e => e.key === 'Enter' && handleDateClick(date)}
            >
              <div className="date-number">{date.date}</div>
              {date.emojiUrl && (
                <img
                  src={date.emojiUrl}
                  alt={date.emojiName}
                  className="emoji-icon"
                />
              )}
              <div className="day-of-week">{dayOfWeek}</div>
            </div>
          )
        })}
      </div>

      {selectedDate && (
        <div className="selection-panel">
          <h3>
            Selected Date: {selectedDate.date} {currentMonth.monthName}
          </h3>

          <div className="day-selector">
            <label htmlFor="day-select">Select Day:</label>
            <select
              id="day-select"
              value={selectedDay}
              onChange={e => handleDaySelect(e.target.value)}
            >
              <option value="">Select a day</option>
              {daysList.map(day => (
                <option key={day.id} value={day.day}>
                  {day.day}
                </option>
              ))}
            </select>
          </div>

          <div className="emoji-selector">
            <label htmlFor="emoji-options">Select Mood:</label>
            <div id="emoji-options" className="emoji-options">
              {emojisList.map(emoji => (
                <img
                  key={emoji.id}
                  src={emoji.emojiUrl}
                  alt={emoji.emojiName}
                  className={`emoji-option ${
                    selectedEmoji?.id === emoji.id ? 'active' : ''
                  }`}
                  onClick={() => handleEmojiSelect(emoji)}
                  role="button"
                  tabIndex="0"
                  onKeyDown={e => e.key === 'Enter' && handleEmojiSelect(emoji)}
                />
              ))}
            </div>
          </div>

          <button
            className="save-button"
            onClick={() => {
              if (selectedEmoji) {
                handleEmojiSelect(selectedEmoji)
              }
            }}
          >
            Save Selection
          </button>
        </div>
      )}
    </div>
  )
}

export default MoodCalendar
