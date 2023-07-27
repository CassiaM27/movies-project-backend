const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const theaters = router.use("/:movieId/theaters", theatersRouter)
const reviews = router.use("/:movieId/reviews", reviewsRouter)

router.route(theaters)
  .get(controller.list)
  .all(methodNotAllowed);

router.route("/:movieId/reviews")
  .get(controller.readMovieReviews)
  .all(methodNotAllowed);

router.route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;