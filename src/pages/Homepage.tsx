function Home() {
  return (
    <div className='home Container-Fondo-Transparente'>
      
      <div className='title'>Pokedex Express</div>
      
      <div className='home-text'>
        <p className="home-subtitle">¡Saludos desde Pueblo Paleta! 🌳,Tu Pokédex rápida para explorar</p>
        
        <p className="home-lead">
¡Bienvenido/a a mi homepage Pokémon! Mi nombre es Franco Galvan, y esta es mi Pokedex personal de información, colecciones y diversión. 
Ponte cómodo/a y navega. ¡Espero que disfrutes del viaje!
        </p>
      </div>
      
      <div className="home-botones">
        <Link className="btn btn-primary btn-ver-pokemons" to="/Pokemones">Explorar Pokémons</Link>
        <Link className="btn btn-secondary btn-ver-pokemons" to="/favoritos">Ver Favoritos</Link>
      </div>
      
    </div>
  )
}
export default Home
import { Link } from 'react-router-dom'