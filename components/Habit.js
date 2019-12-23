import HabitButton from './HabitButton'

const colors = ['#718096', '#f56565', '#f6e05e', '#68d391', '#63b3ed']

const Habit = ({ habit, index }) => {
  const dates = getLast5Days()

  console.log('index', colors[index])

  return (
    <article>
      <h3 style={{ borderColor: colors[index] }}>{habit}</h3>
      <div className="buttons">
        {dates.map(date => (
          <HabitButton key={date.getTime()} date={date} />
        ))}
      </div>

      <style jsx>
        {`
          h3 {
            margin-top: 0;
            border-bottom: 4px solid ${colors[index]};
          }

          article {
            padding: 20px;
            border-radius: 15px;
            box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
          }

          .buttons {
            display: flex;
          }
        `}
      </style>
    </article>
  )
}

const getLast5Days = () => {
  const dates = '01234'.split('').map(day => {
    const tempDate = new Date()
    tempDate.setDate(tempDate.getDate() - day)
    return tempDate
  })
  return dates
}

export default Habit
