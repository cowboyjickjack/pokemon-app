import React, { useState } from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState([]);
  const [pokemon, setPokemon] = useState("");

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  // Define the groupedData function
  const groupedData = (pokemonData) => {
    return {
      name: pokemonData.name,
      id: pokemonData.id,
      abilities: pokemonData.abilities.map((ability) => ability.ability.name)
      // Add more fields as needed
    };
  };

  const searchPokemon = (event) => {
    if (event.key === 'Enter' || event.key === !'click') {
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
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      console.log("Enter has been hit.");
      searchPokemon(event);
    }
  }

  return (
    <div className="App">
      <div className="page-wrapper">
        <div className="container">
          <header>
            <img alt="PokéAPI" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" />
          </header>
          <div className="row-search">
            <h4>Please search a Pokémon:</h4>
            <div className="search-bar">
              <input value={pokemon}
                onChange={(event) => setPokemon(event.target.value)}
                onKeyDown={handleEnter} 
                type="text" placeholder="Search" />
              <button type="submit" onClick={searchPokemon}>Search
              </button>
            </div>
          <div className="row-pokemon">
            <div className="name">
              {data.name}
            </div>
            <div className="abilities">
                Abilities:
                <ul>
                  {data.abilities &&
                    data.abilities.map((ability, index) => (
                      <li key={index}>{ability}</li>
                    ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
