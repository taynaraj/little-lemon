import { initializeTimes, updateTimes, submitForm } from './Main';

const DEFAULT_TIMES = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

afterEach(() => {
  delete window.fetchAPI;
});

test('initializeTimes returns the default times when fetchAPI is unavailable', () => {
  expect(initializeTimes()).toEqual(DEFAULT_TIMES);
});

test('initializeTimes returns the result of window.fetchAPI when available', () => {
  window.fetchAPI = jest.fn(() => ['10:00', '11:00']);
  expect(initializeTimes()).toEqual(['10:00', '11:00']);
  expect(window.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
});

test('updateTimes keeps the current state when fetchAPI is unavailable', () => {
  const action = { type: 'UPDATE_TIMES', date: '2026-06-22' };
  expect(updateTimes(DEFAULT_TIMES, action)).toEqual(DEFAULT_TIMES);
});

test('updateTimes returns the result of window.fetchAPI for the selected date', () => {
  window.fetchAPI = jest.fn(() => ['09:00', '10:00']);
  const action = { type: 'UPDATE_TIMES', date: '2026-06-22' };
  expect(updateTimes(DEFAULT_TIMES, action)).toEqual(['09:00', '10:00']);
  expect(window.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
});

describe('submitForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    delete window.submitAPI;
    jest.restoreAllMocks();
  });

  test('writes the new booking to localStorage and navigates on success', () => {
    window.submitAPI = jest.fn(() => true);
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const navigate = jest.fn();
    const formData = { date: '2026-06-22', time: '18:00', guests: 2, occasion: 'Birthday' };

    submitForm(formData, navigate);

    expect(setItemSpy).toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem('bookings'))).toEqual([formData]);
    expect(navigate).toHaveBeenCalledWith('/confirmed');
  });

  test('reads existing bookings from localStorage before appending a new one', () => {
    window.submitAPI = jest.fn(() => true);
    const existingBooking = { date: '2026-06-01', time: '17:00', guests: 1, occasion: 'Anniversary' };
    localStorage.setItem('bookings', JSON.stringify([existingBooking]));
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    const navigate = jest.fn();
    const newBooking = { date: '2026-06-22', time: '18:00', guests: 2, occasion: 'Birthday' };

    submitForm(newBooking, navigate);

    expect(getItemSpy).toHaveBeenCalledWith('bookings');
    expect(JSON.parse(localStorage.getItem('bookings'))).toEqual([
      existingBooking,
      newBooking,
    ]);
  });
});
