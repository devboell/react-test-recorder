// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'

import './index.css'

const releaseYears = Array.from({ length: 10 }, (v, i) => i + 1970)
const genres = [
  'western',
  'comedy',
  'drama',
  'horror',
  'sci-fi',
  'adventure',
  'thriller',
  'crime',
]

const MovieEditorForm = ({ movie, saveMovie }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: movie.title,
      year: movie.year,
      rating: movie.rating,
      genres: movie.genres,
      available: movie.available,
    },
    onSubmit: (formValues) => {
      const values = {
        ...formValues,
        year: parseInt(formValues.year, 10),
      }
      saveMovie(values)
    },
  })

  return (
    <form className="editor-form" onSubmit={formik.handleSubmit}>
      <div className="form-fields">
        <label className="field-label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <label className="field-label" htmlFor="year">
          Year
        </label>
        <select
          id="year"
          name="year"
          value={formik.values.year}
          onChange={formik.handleChange}
        >
          {releaseYears.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <label className="field-label" htmlFor="rating">
          Rating{' '}
        </label>

        <input
          id="rating"
          name="rating"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.rating}
        />

        <div className="field-label">Genres</div>
        <div className="genres-container">
          {genres.map((genre) => (
            <div key={genre}>
              <label htmlFor={`genre-input-${genre}`}>{genre}</label>
              <input
                id={`genre-input-${genre}`}
                name="genres"
                type="checkbox"
                onChange={formik.handleChange}
                value={genre}
                checked={formik.values.genres.includes(genre)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="controls">
        <button className="editor-button" type="submit">
          Save
        </button>
      </div>
    </form>
  )
}

MovieEditorForm.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    year: PropTypes.number,
    rating: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    available: PropTypes.bool,
  }).isRequired,
  saveMovie: PropTypes.func.isRequired,
}

export default MovieEditorForm
