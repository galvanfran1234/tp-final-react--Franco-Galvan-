import { useState, useEffect } from 'react'
import '../components/Pokemoncard.tsx'

interface Pokemon {
name: string;
url: string;
id: number;
types: { slot: number; type: { name: string; url: string } }[];
sprites: {
    other: {
        dream_world: {
            front_default: string;
        };
    };
};
}
import { CardPokemon as PokemonTarjeta } from '../components/Pokemoncard.tsx';
function PokemonLista() {

  const [pokemones, setPokemones] = useState<Pokemon[]>([])

  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
  //     .then(res => res.json())
  //     .then(data => setPokemones(data.results))
  // }, [])
const getPokemons = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pokemones.length}`)
      .then(res => res.json())
      .then(data => { 
        // setPokemones(data.results)
        // Fetch adicional para obtener todas las propiedades, incluyendo ID
        Promise.all(data.results.map((pokemon: { url: RequestInfo | URL }) => fetch(pokemon.url)
            .then(res => res.json())
            .then(details => ({ ...pokemon, id: details.id, types: details.types, sprites: details.sprites , stats: details.stats, moves: details.moves }))
        )).then(pokemonesConId => setPokemones([...pokemones, ...pokemonesConId]))
      })
}
  useEffect(() => {
    getPokemons();
  }, [])

  const cargarMasPokemones = () => {
    getPokemons();
  }


  if (!pokemones) return <p>Cargando...</p>

  return (
    <>
      <div className='1'><p>Lista de Pokemons</p></div>
      <div className='pokemon-card-box'>        
        {pokemones.map(pokemon => (
          <PokemonTarjeta key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <button className='btn-cargar-mas' onClick={cargarMasPokemones}><a>Ver más pokemones</a></button>
    </>
  )
}

export default PokemonLista;
