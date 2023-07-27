const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `id not found: ${req.params.movieID}`,
  });
}

async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await service.listMoviesShowing();
    return res.json({ data });
  }
  const data = await service.list();
  res.json({ data });
}

async function read(req, res) {
  res.json({ data: await service.read(req.params.movieId) });
}

async function readMovieReviews(req, res) {
  const data = await service.readMovieReviews(req.params.movieId);
  const result = data.map((review) => {
    return {
      review_id: review.review_id,
      content: review.content,
      score: review.score,
      created_at: review.review_created_at,
      updated_at: review.review_updated_at,
      critic_id: review.critic_id,
      movie_id: review.movie_id,
      critic: {
        critic_id: review.critic_id,
        preferred_name: review.preferred_name,
        surname: review.surname,
        organization_name: review.organization_name,
        created_at: review.critic_created_at,
        updated_at: review.critic_updated_at
      }
    }
  });
  res.json({ data: result });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  readMovieReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readMovieReviews)],
};