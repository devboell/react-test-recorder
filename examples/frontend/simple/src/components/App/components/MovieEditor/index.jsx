// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react'
import PropTypes from 'prop-types'

import MovieEditorForm from './components/MovieEditorForm'
import MovieEditorEmpty from './components/MovieEditorEmpty'

import './index.css'

const MovieEditor = ({ movie, saveMovie }) => {
  return (
    <div className="editor-container">
      {movie ? (
        <MovieEditorForm movie={movie} saveMovie={saveMovie} />
      ) : (
        <MovieEditorEmpty />
      )}
    </div>
  )
}
MovieEditor.propTypes = {
  movie: PropTypes.shape({}),
  saveMovie: PropTypes.func.isRequired,
}

export default MovieEditor
