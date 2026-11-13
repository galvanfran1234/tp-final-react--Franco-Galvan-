import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="main-content">
      <div className="home-hero">
        <span className="home-badge">
          ⚡ Pokédex 1ra Generación & Más
        </span>

        <h1 className="home-title">Pokédex Express</h1>

        <p className="home-subtitle">
          ¡Saludos desde Pueblo Paleta! 🌳
        </p>

        <p className="home-lead">
          Bienvenido/a a tu Pokédex interactiva. Explora información en tiempo real, 
          estadísticas de combate, tipos elementales y los detalles de tus Pokémon favoritos.
        </p>

        <div className="home-botones">
          <Link className="btn btn-primary" to="/pokemones">
            Explorar Pokémons →
          </Link>
          <a 
            className="btn btn-secondary" 
            href="https://pokeapi.co/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Powered by PokéAPI
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
