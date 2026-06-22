import { useState } from 'react';

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0]);
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  const today = new Date().toISOString().split('T')[0];

  const getIsFormValid = () => {
    const guestsNumber = Number(guests);
    return (
      date !== '' &&
      time !== '' &&
      !Number.isNaN(guestsNumber) &&
      guestsNumber >= 1 &&
      guestsNumber <= 10
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm({ date, time, guests, occasion });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatch({ type: 'UPDATE_TIMES', date: e.target.value });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="res-date">Escolha a data</label>
        <input
          type="date"
          id="res-date"
          min={today}
          required
          value={date}
          onChange={handleDateChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {availableTimes.map((availableTime) => (
            <option key={availableTime} value={availableTime}>
              {availableTime}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          min="1"
          max="10"
          required
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={!getIsFormValid()}
      >
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;
