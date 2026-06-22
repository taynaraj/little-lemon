import Nav from './Nav';
import logo from './assets/logo.png';

function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Little Lemon logo" />
      <Nav />
    </header>
  );
}

export default Header;
