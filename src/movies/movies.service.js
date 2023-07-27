const knex = require("../db/connection");

async function list() {
  return knex("movies").select("*")
}

async function listMoviesShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.is_showing")
    .where({ "mt.is_showing": true })
    .distinct("mt.is_showing");
}

async function read(movie_id) {
  return knex("movies as m")
    .select("*")
    .where({"m.movie_id": movie_id})
    .first()
}

async function readMovieReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at as review_created_at",
      "r.updated_at as review_updated_at",
      "c.critic_id",
      "r.movie_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ "r.movie_id": movieId });
}

module.exports = {
  list,
  listMoviesShowing,
  read,
  readMovieReviews,
};