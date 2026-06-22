import BookingForm from './BookingForm';

function BookingPage() {
  return (
    <main className="main booking-page">
      <h1>Reserve a Table</h1>
      <p>Book your table at Little Lemon in a few simple steps.</p>
      <BookingForm />
    </main>
  );
}

export default BookingPage;
