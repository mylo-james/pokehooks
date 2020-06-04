import React, { useContext, useState } from 'react';
import pokemonContext from './contexts/pokemonContext';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';

const LoginPanel = (props) => {
  const { login, needLogin, token } = useContext(pokemonContext);

  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };
    console.log(`email: ${email} password: ${password}`);
    try {
      const response = await fetch(`${baseUrl}/session`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const { token } = await response.json();
        login(token);
        props.history.push('/');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default LoginPanel;
