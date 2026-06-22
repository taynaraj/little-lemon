import { initializeTimes, updateTimes } from './Main';

test('initializeTimes returns the default available times', () => {
  expect(initializeTimes()).toEqual([
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ]);
});

test('updateTimes returns the expected times for UPDATE_TIMES action', () => {
  const initialState = initializeTimes();
  const action = { type: 'UPDATE_TIMES', date: '2026-06-22' };
  expect(updateTimes(initialState, action)).toEqual(initializeTimes());
});
