// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useEffect, useState } from 'react'

import MovieTable from './components/MovieTable'
import MovieEditor from './components/MovieEditor'

import './index.css'

const App = () => {
  const [movies, setMovies] = useState([])
  const [selectedMovieId, setSelectedMovieId] = useState('')

  const fetchMovies = async () => {
    const response = await fetch('http://localhost:3001/movies', {
      method: 'get',
    })
    const usersJSON = await response.json()

    setMovies(usersJSON.movies)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const saveMovie = async (values) => {
    await fetch(`http://localhost:3001/movies/${selectedMovieId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    fetchMovies()
  }
  const selectedMovie = movies.find(
    // eslint-disable-next-line no-underscore-dangle
    (movie) => movie._id === selectedMovieId,
  )

  return (
    <div className="container">
      <MovieTable movies={movies} viewMovie={setSelectedMovieId} />
      <MovieEditor movie={selectedMovie} saveMovie={saveMovie} />
    </div>
  )
}

export default App
