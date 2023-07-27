const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewIdExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found, id #${req.params.reviewID}`,
  });
}

async function read(req, res) {
  const data = await service.read(req.params.reviewId);
  res.json({ data: data });
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  res.json({ data: data });
}

async function destroy(req, res) {
  const data = await service.delete(req.params.reviewId);
  res.sendStatus(204);
}

module.exports = {
  read: [asyncErrorBoundary(reviewIdExists), read],
  update: [asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewIdExists), destroy]
};