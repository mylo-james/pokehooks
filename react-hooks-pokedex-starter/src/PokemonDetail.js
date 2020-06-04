import React, { useContext, useEffect } from 'react';
import { imageUrl } from './config';
import pokemonContext from './contexts/pokemonContext';
import { useParams } from 'react-router-dom';

// class PokemonDetail extends Component {
const PokemonDetail = (props) => {
  const { singlePokemon, getOnePokemon } = useContext(pokemonContext);
  let { id } = useParams();
  id = parseInt(id);

  useEffect(() => {
    if (!singlePokemon || singlePokemon.id !== id) {
      getOnePokemon(id);
    }
  }, [id, getOnePokemon, singlePokemon]);

  if (!singlePokemon) return null;
  return (
    <div className="pokemon-detail">
      <h1 className="bigger">{singlePokemon.name}</h1>
      <div className="pokemon-detail-image-background">
        <div
          className="pokemon-detail-image"
          style={{
            backgroundImage: `url('${imageUrl}${singlePokemon.imageUrl}')`,
          }}
        ></div>
      </div>
      <div className="pokemon-detail-lists">
        <h2>Information</h2>
        <ul>
          <li>
            <b>Type</b> {singlePokemon.type}
          </li>
          <li>
            <b>Attack</b> {singlePokemon.attack}
          </li>
          <li>
            <b>Defense</b> {singlePokemon.defense}
          </li>
          <li>
            <b>Moves</b>
            <ul>
              {singlePokemon.moves.map((move) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </li>
        </ul>
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Happiness</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {singlePokemon.items.map((item) => (
              <tr key={item.name}>
                <td>
                  <img
                    className="item-image"
                    alt={item.imageUrl}
                    src={`${imageUrl}${item.imageUrl}`}
                  />
                </td>
                <td>{item.name}</td>
                <td className="centered">{item.happiness}</td>
                <td className="centered">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokemonDetail;
