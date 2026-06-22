import { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import BookingPage from './BookingPage';

export function initializeTimes() {
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

export function updateTimes(state, action) {
  if (action.type === 'UPDATE_TIMES') {
    return initializeTimes();
  }
  return state;
}

function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    null,
    initializeTimes
  );

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<></>} />
        <Route
          path="/booking"
          element={
            <BookingPage availableTimes={availableTimes} dispatch={dispatch} />
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
