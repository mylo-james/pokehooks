import React, { useState } from 'react';
import { baseUrl } from './config';

import App from './App';
import pokemonContext from './contexts/pokemonContext';

const AppWithContext = () => {
  const storageToken = window.localStorage.getItem('state-pokedex-token');

  const [loaded, setLoaded] = useState(false);
  const [needLogin, setNeedLogin] = useState(!storageToken);
  const [pokemon, setPokemon] = useState([]);
  const [token, setToken] = useState(storageToken);
  const [singlePokemon, setSinglePokemon] = useState(null);

  const login = (token) => {
    setToken(token);

    window.localStorage.setItem('state-pokedex-token', token);
    setNeedLogin(false);
  };

  const loadPokemon = async () => {
    const response = await fetch(`${baseUrl}/pokemon`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const pokemon = await response.json();
      setPokemon(pokemon);
    }
  };

  const getOnePokemon = async (id) => {
    const response = await fetch(`${baseUrl}/pokemon/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const pokemon = await response.json();

      setSinglePokemon(pokemon);
    } else {
      console.log(`not working`, response);
    }
  };
  return (
    <pokemonContext.Provider
      value={{
        needLogin,
        loaded,
        setLoaded,
        login,
        loadPokemon,
        getOnePokemon,
        singlePokemon,
        pokemon,
        token,
      }}
    >
      <App />
    </pokemonContext.Provider>
  );
};

export default AppWithContext;
