import HabitButton from './HabitButton'

const Habit = () => {
  return (
    <article>
      <h3>Habit Title</h3>
      <div>
        <HabitButton>0</HabitButton>
        <HabitButton>0</HabitButton>
        <HabitButton>0</HabitButton>
        <HabitButton>X</HabitButton>
        <HabitButton>0</HabitButton>
      </div>
    </article>
  )
}

export default Habit
