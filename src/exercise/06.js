// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle',
  })
  const {pokemon, error, status} = state

  React.useEffect(() => {
    if (!pokemonName) return

    setState({pokemon: null, error: null, status: 'pending'})

    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({...state, status: 'resolved', pokemon: pokemonData})
      })
      .catch(err => {
        setState({...state, status: 'rejected', error: err.message})
      })
  }, [pokemonName])

  return status === 'idle' ? (
    'Submit a pokemon'
  ) : status === 'pending' ? (
    <PokemonInfoFallback name={pokemonName} />
  ) : status === 'resolved' ? (
    <PokemonDataView pokemon={pokemon} />
  ) : (
    <div role="alert">
      There was an error:
      <pre style={{whiteSpace: 'normal'}}>{error}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />

      <hr />

      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
