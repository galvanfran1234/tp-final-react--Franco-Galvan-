import React from 'react';
import { Link } from 'react-router-dom';

interface PokemonType {
  type: {
    name: string;
    url?: string;
  };
}

export interface Pokemon {
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
  types: PokemonType[];
}

interface CardPokemonProps {
  pokemon: Pokemon;
}

export const CardPokemon: React.FC<CardPokemonProps> = ({ pokemon }) => {
  const imgSrc =
    pokemon.sprites?.other?.dream_world?.front_default ||
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    '';

  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card">
      <div className="card-img">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={pokemon.name}
            loading="lazy"
          />
        ) : (
          <div className="state-message">Sin imagen</div>
        )}
      </div>
      <div className="card-info">
        <span className="pokemon-id">#{formattedId}</span>
        <h3>{pokemon.name}</h3>
        <div className="card-types">
          {pokemon.types?.map((t) => (
            <span key={t.type.name} className={`type-badge ${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
