import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

test('renders the static date label text', () => {
  render(
    <BookingForm
      availableTimes={['17:00']}
      dispatch={jest.fn()}
      submitForm={jest.fn()}
    />
  );
  const labelElement = screen.getByText('Escolha a data');
  expect(labelElement).toBeInTheDocument();
});

test('renders the HTML5 validation attributes on the form fields', () => {
  render(
    <BookingForm
      availableTimes={['17:00']}
      dispatch={jest.fn()}
      submitForm={jest.fn()}
    />
  );

  const dateInput = screen.getByLabelText('Escolha a data');
  expect(dateInput).toBeRequired();
  expect(dateInput).toHaveAttribute('min');

  const timeSelect = screen.getByLabelText('Choose time');
  expect(timeSelect).toBeRequired();

  const guestsInput = screen.getByLabelText('Number of guests');
  expect(guestsInput).toBeRequired();
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
});

test('disables the submit button when required fields are empty', () => {
  render(
    <BookingForm
      availableTimes={['17:00']}
      dispatch={jest.fn()}
      submitForm={jest.fn()}
    />
  );

  const submitButton = screen.getByRole('button', {
    name: /make your reservation/i,
  });
  expect(submitButton).toBeDisabled();
});

test('enables the submit button when all required fields are valid', () => {
  render(
    <BookingForm
      availableTimes={['17:00']}
      dispatch={jest.fn()}
      submitForm={jest.fn()}
    />
  );

  const dateInput = screen.getByLabelText('Escolha a data');
  const timeSelect = screen.getByLabelText('Choose time');
  const guestsInput = screen.getByLabelText('Number of guests');
  const submitButton = screen.getByRole('button', {
    name: /make your reservation/i,
  });

  fireEvent.change(dateInput, { target: { value: '2026-07-01' } });
  fireEvent.change(timeSelect, { target: { value: '17:00' } });
  fireEvent.change(guestsInput, { target: { value: '4' } });

  expect(submitButton).toBeEnabled();
});
