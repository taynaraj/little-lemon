import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home navigation link', () => {
  render(<App />);
  const linkElement = screen.getByText('Home');
  expect(linkElement).toBeInTheDocument();
});
