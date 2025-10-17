import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PokemonData {
  name: string;
  sprites: {
    other: any;
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}

const Datapokemons = () => {
  const { id } = useParams<{ id: string }>(); // Se cambió de pokemonName a id para que coincida con la ruta
  const [pokemonData, setPokemonData] = useState<PokemonData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: PokemonData = await response.json();
        setPokemonData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Se produjo un error desconocido");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemonData();
    }
  }, [id]);

  if (loading) {
    return <div>Cargando Pokémon...</div>;
  }

  if (error) {
    return <div>Error al cargar el Pokémon: {error}</div>;
  }

  if (!pokemonData) {
    return <div>No se encontró información del Pokémon.</div>;
  }

  return (
     <div className="datapokemons-container">
      <h1>{pokemonData.name.toUpperCase()}</h1>
      <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
      <div className="types">
        {pokemonData.types.map((typeInfo, index) => (
          <span key={index} className={`type-badge ${typeInfo.type.name}`}>
            {typeInfo.type.name.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="card">
        <h3 className="titulo">Estadisticas</h3>
        <div className="alineado">
          <p>HP:</p>
          <p>{pokemonData.stats[0]?.base_stat || 'N/A'}</p>
        </div>
        <div className="alineado">
          <p>Ataque:</p>
          <p>{pokemonData.stats[1]?.base_stat || 'N/A'}</p>
        </div>
        <div className="alineado">
          <p>Defensa:</p>
          <p>{pokemonData.stats[2]?.base_stat || 'N/A'}</p>
        </div>
        <div className="alineado">
          <p>Ataque especial:</p>
          <p>{pokemonData.stats[3]?.base_stat || 'N/A'}</p>
        </div>
        <div className="alineado">
          <p>Defensa especial:</p>
          <p>{pokemonData.stats[4]?.base_stat || 'N/A'}</p>
        </div>
        <div className="alineado">
          <p>Velocidad:</p>
          <p>{pokemonData.stats[5]?.base_stat || 'N/A'}</p>
        </div>
      </div>
     </div>
  );
};
export default Datapokemons;
