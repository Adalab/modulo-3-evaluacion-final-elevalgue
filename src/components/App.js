import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../stylesheets/App.css';
import Logo from '../images/logo.png';
import getDataFromApi from '../services/api';
import Filters from './Filters';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filterName, setFilterName] = useState('');
  // const [filterSpecies, setFIlterSpecies] = useState('all');

  useEffect(() => {
    getDataFromApi().then((character) => {
      const orderedObject = character.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      setCharacters(orderedObject);
    });
  });
  // useEffect(() => {
  //   getDataFromApi().then((data) => {
  //     const orderedObject = character.sort((a, b) => {
  //       if (a.name > b.name) {
  //         return 1;
  //       } else if (a.name < b.name) {
  //         return -1;
  //       }
  //       return 0;
  //     });
  //     setCharacters(orderedObject)
  //   }
  //   )};

  useEffect(() => {
    localStorage.setItem('filterName', JSON.stringify(filterName));
  }, [filterName]);

  // event handlers
  const handleFilterName = (data) => {
    if (data.key === 'name') {
      setFilterName(data.value);
    }
  };

  //función para ordenar los personajes alfabeticamente
  // const sortNames = characters.sort((a, b) => {
  //   if (a.name < b.name) return 1;
  //   if (a.name > b.name) return -1;
  //   return 0;
  // });

  //por qué renderFilteredCharacters es undefined?
  const renderFilteredCharacters = () => {
    return characters.filter((character) =>
      character.name.toUpperCase().includes(filterName.toUpperCase())
    );
  };

  //route

  const renderCharacterDetail = (props) => {
    const characterId = parseInt(props.match.params.id);
    const foundCharacter = characters.find(
      (character) => character.id === characterId
    );
    if (foundCharacter === undefined) {
      return <p className='characterNotFound'>Personaje no encontrado</p>;
    } else {
      return <CharacterDetail character={foundCharacter}></CharacterDetail>;
    }
  };

  return (
    <div className='app'>
      <img className='title__img' src={Logo} alt='Rick and Morty logo' />
      <Switch>
        <Route exact path='/'>
          <Filters
            filterName={filterName}
            handleFilterName={handleFilterName}
          />
          <CharacterList
            characters={renderFilteredCharacters()}
            // sort={sortNames}
          />
        </Route>
        <Route path='/character/:id' render={renderCharacterDetail} />
      </Switch>
    </div>
  );
};
// };
export default App;
