import React, { useState } from "react";
import axios from "axios";

//TODO make card for pokemon (inc. sprite, name, health?)
//TODO make it to where when user hits details, you can see info on that pokemon.

function App() {

  const [data, setData] = useState([]);
  const [pokemon, setPokemon] = useState("");

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  // Define the groupedData function
  const groupedData = (pokemonData) => {
    // then used as 'data._'
    return {
      name: pokemonData.name,
      id: pokemonData.id,
      abilities: pokemonData.abilities.map((ability) => ability.ability.name)
      // Add more fields as needed
    };
  };

  const searchPokemon = (event) => {
    if (!pokemon || !isNaN(pokemon)) {
      alert ('Please input a pokemon');
      return;
    }

    axios.get(url)
    .then((response) => {

      const groupedDataResult = groupedData(response.data);
        setData(groupedDataResult);
        console.log(response.data);
        console.log(response.data.abilities);
        console.log(response.data.id);
    })

    .catch((error) => {
      console.error(error);
      if (error.response && error.response.status === 404) {
        console.error(
          "Pokemon not found or API request failed. Please try again."
        );
      }
    });
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      console.log("Enter has been hit.");
      searchPokemon(event);
    }
  }

  const handleButtonClick = () => {
    searchPokemon();
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="App">
      <div className="page-wrapper">
        <div className="container">
          <div>
            <img className="pokeapi-icon" alt="PokéAPI" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" />
          </div>
          <div className="row-search">
            <h4>Search a Pokémon:</h4>
              <div className="search-bar">
                <input value={pokemon}
                  onChange={(event) => setPokemon(event.target.value)}
                  onKeyDown={handleEnter} 
                  type="text" placeholder="Search" />
                <button type="button" onClick={handleButtonClick}><svg stroke="currentColor" fill="rgb(43, 48, 58)" strokeWidth="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                </button>
              </div>
          </div>
          <div className="row-pokemon">
            <div className="card">
              <div className="name">
                Name:
                  {data.name && (
                    <>
                      {capitalize(data.name)}
                    </>
                  )}
              </div>
              <div className="sprite">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`} alt="sprite-icon" />
              </div>
              <div className="details">
                <button type="button" onClick={handleButtonClick}><span>Details</span></button>
              </div>
              {/* <div className="abilities">
                <div className="abilities-title">
                  Abilities:
                </div>
                  <ul>
                    {data.abilities &&
                      data.abilities.map((ability, index) => (
                        <li key={index}>{ability}</li>
                      ))}
                  </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
