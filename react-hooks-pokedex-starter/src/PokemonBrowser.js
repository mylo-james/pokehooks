import React, { useContext, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { imageUrl } from './config';
import PokemonDetail from './PokemonDetail';
import pokemonContext from './contexts/pokemonContext';

const PokemonBrowser = () => {
  const { pokemon, loadPokemon } = useContext(pokemonContext);

  //

  useEffect(() => {
    if (pokemon.length === 0) {
      console.log(pokemon.length);
      loadPokemon();
    }
  }, [pokemon.length, loadPokemon]);

  return (
    <main>
      <nav>
        {pokemon.map((pokemon) => {
          return (
            <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
              <div className="nav-entry">
                <div
                  className="nav-entry-image"
                  style={{
                    backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')`,
                  }}
                ></div>
                <h1>{pokemon.name}</h1>
              </div>
            </NavLink>
          );
        })}
      </nav>
      <Route path="/pokemon/:id" component={PokemonDetail} />
    </main>
  );
};

export default PokemonBrowser;
