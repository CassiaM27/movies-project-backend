const knex = require("../db/connection");
const reduceProperties = require('../utils/reduce-properties.js')

const reduceMovies = reduceProperties("theater_id", {
  rating: ["movies", null, "rating"],
  runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
  title: ["movies", null, "title"],
});

async function list() {
  return knex("theaters as t")
    .join('movies_theaters as mt', 'mt.theater_id', 't.theater_id')
    .join('movies as m', 'm.movie_id', 'mt.movie_id')
    .select('t.*', 'm.*')
    .then(reduceMovies)
}

async function listTheatersShowing(movie_id) {
  return knex("theaters as t")
    .join('movies_theaters as mt', 'mt.theater_id', 't.theater_id')
    .join('movies as m', 'm.movie_id', 'mt.movie_id')
    .select('t.name')
    .where({ "mt.movie_id": movie_id })
    .andWhere({ "mt.is_showing": true })
}

module.exports = {
  list,
  listTheatersShowing,
};