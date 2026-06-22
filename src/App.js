import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Main from './components/Main';
import Footer from './Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
