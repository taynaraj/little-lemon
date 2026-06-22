import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          Little Lemon is a family-owned Mediterranean restaurant in Chicago,
          blending traditional recipes with a modern twist. Come share our
          vibrant menu in a warm, casual atmosphere.
        </p>
        <Link to="/booking" className="hero-button">
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}

export default Hero;
