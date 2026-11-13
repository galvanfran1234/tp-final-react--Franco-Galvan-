import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface StatItem {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default?: string;
    other?: {
      dream_world?: {
        front_default?: string;
      };
      'official-artwork'?: {
        front_default?: string;
      };
    };
  };
  stats: StatItem[];
  types: {
    type: {
      name: string;
    };
  }[];
}

const STAT_NAMES: Record<string, string> = {
  hp: "Puntos de Vida (HP)",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque Especial",
  "special-defense": "Defensa Especial",
  speed: "Velocidad",
};

const Datapokemons = () => {
  const { id } = useParams<{ id: string }>();
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
          throw new Error(`Error ${response.status}: No se pudo cargar el Pokémon`);
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
    return (
      <div className="main-content">
        <div className="state-message">
          <p>Cargando información del Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemonData) {
    return (
      <div className="main-content">
        <div className="state-message">
          <p>{error || "No se encontró información del Pokémon."}</p>
          <br />
          <Link to="/pokemones" className="btn btn-secondary">
            ← Volver a la Pokédex
          </Link>
        </div>
      </div>
    );
  }

  const imgSrc =
    pokemonData.sprites?.other?.dream_world?.front_default ||
    pokemonData.sprites?.other?.['official-artwork']?.front_default ||
    pokemonData.sprites?.front_default ||
    '';

  const formattedId = String(pokemonData.id).padStart(3, "0");

  return (
    <div className="detail-page-container">
      <Link to="/pokemones" className="back-link">
        ← Volver a la lista
      </Link>

      <div className="datapokemons-container">
        <span className="detail-id">#{formattedId}</span>
        <h1>{pokemonData.name.toUpperCase()}</h1>

        <div className="detail-img-container">
          {imgSrc && (
            <img src={imgSrc} alt={pokemonData.name} />
          )}
        </div>

        <div className="types">
          {pokemonData.types.map((typeInfo, index) => (
            <span
              key={index}
              className={`type-badge ${typeInfo.type.name.toLowerCase()}`}
            >
              {typeInfo.type.name.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="stats-card">
          <h3 className="stats-title">Estadísticas Base</h3>
          {pokemonData.stats.map((item) => {
            const statPercent = Math.min(Math.round((item.base_stat / 200) * 100), 100);
            let barLevel = "low";
            if (item.base_stat >= 80) barLevel = "high";
            else if (item.base_stat >= 50) barLevel = "medium";

            return (
              <div key={item.stat.name} className="stat-row">
                <span className="stat-name">
                  {STAT_NAMES[item.stat.name] || item.stat.name}
                </span>
                <span className="stat-number">{item.base_stat}</span>
                <div className="stat-bar-bg">
                  <div
                    className={`stat-bar-fill ${barLevel}`}
                    style={{ width: `${statPercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Datapokemons;
