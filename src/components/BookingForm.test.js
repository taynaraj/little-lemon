import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

test('renders the static date label text', () => {
  render(<BookingForm availableTimes={['17:00']} dispatch={jest.fn()} />);
  const labelElement = screen.getByText('Escolha a data');
  expect(labelElement).toBeInTheDocument();
});
