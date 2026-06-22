import { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BookingPage from './BookingPage';
import ConfirmedPage from './ConfirmedPage';

const DEFAULT_TIMES = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

export function initializeTimes() {
  const today = new Date();
  if (typeof window.fetchAPI === 'function') {
    return window.fetchAPI(today);
  }
  return DEFAULT_TIMES;
}

export function updateTimes(state, action) {
  if (action.type === 'UPDATE_TIMES') {
    if (typeof window.fetchAPI === 'function') {
      const selectedDate = new Date(action.date);
      return window.fetchAPI(selectedDate);
    }
    return state;
  }
  return state;
}

function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    null,
    initializeTimes
  );
  const navigate = useNavigate();

  function submitForm(formData) {
    if (typeof window.submitAPI === 'function' && window.submitAPI(formData)) {
      const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      existingBookings.push(formData);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      navigate('/confirmed');
    }
  }

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<></>} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedPage />} />
      </Routes>
    </main>
  );
}

export default Main;
