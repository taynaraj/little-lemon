import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Main from './Main';
import BookingPage from './components/BookingPage';
import Footer from './Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
