const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function listTheatersShowing(req, res) {
  const data = await service.listTheatersShowing(req.params.movieId);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listTheatersShowing: asyncErrorBoundary(listTheatersShowing),
};