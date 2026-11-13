import { useState, useEffect } from 'react';
import { CardPokemon as PokemonTarjeta, Pokemon } from '../components/Pokemoncard';

function PokemonLista() {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [cargandoMas, setCargandoMas] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>('');

  const getPokemons = (offset: number) => {
    const esCargaInicial = offset === 0;
    if (esCargaInicial) setCargando(true);
    else setCargandoMas(true);

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        return Promise.all(
          data.results.map((pokemon: { url: string }) =>
            fetch(pokemon.url).then((res) => res.json())
          )
        );
      })
      .then((detalles: Pokemon[]) => {
        setPokemones((prev) => (esCargaInicial ? detalles : [...prev, ...detalles]));
      })
      .catch((error) => {
        console.error("Error al cargar pokémons:", error);
      })
      .finally(() => {
        setCargando(false);
        setCargandoMas(false);
      });
  };

  useEffect(() => {
    getPokemons(0);
  }, []);

  const cargarMasPokemones = () => {
    if (!cargandoMas) {
      getPokemons(pokemones.length);
    }
  };

  // Filtrado en vivo por nombre o ID
  const pokemonesFiltrados = pokemones.filter((poke) => {
    const termino = busqueda.toLowerCase().trim();
    return (
      poke.name.toLowerCase().includes(termino) ||
      String(poke.id).includes(termino)
    );
  });

  return (
    <div className="main-content">
      <div className="list-header">
        <h1 className="list-title">Pokédex Nacional</h1>
        <div className="search-box-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre o número (ej: Pikachu, 25)..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {cargando ? (
        <div className="state-message">
          <p>Cargando Pokédex...</p>
        </div>
      ) : (
        <>
          {pokemonesFiltrados.length === 0 ? (
            <div className="state-message">
              <p>No se encontraron Pokémon con "{busqueda}".</p>
            </div>
          ) : (
            <div className="pokemon-card-box">
              {pokemonesFiltrados.map((pokemon) => (
                <PokemonTarjeta key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          )}

          {!busqueda && (
            <div className="load-more-container">
              <button
                className="btn-cargar-mas"
                onClick={cargarMasPokemones}
                disabled={cargandoMas}
              >
                {cargandoMas ? 'Cargando más...' : 'Cargar más Pokémon'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PokemonLista;
