import { initializeTimes, updateTimes } from './Main';

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
