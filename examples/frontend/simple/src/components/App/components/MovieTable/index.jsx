/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import './index.css'

const MovieTable = ({ movies, viewMovie }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Year</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {movies.map((movie) => (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.year}</td>
          <td>
            <button
              className="action"
              type="button"
              onClick={() => viewMovie(movie._id)}
              data-testid={`view-${movie._id}`}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

MovieTable.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  viewMovie: PropTypes.func.isRequired,
}

export default MovieTable
