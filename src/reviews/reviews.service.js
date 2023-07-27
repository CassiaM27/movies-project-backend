const knex = require("../db/connection");

function create(review) {
  return knex("reviews")
    .insert(review)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(review_id) {
  return knex("reviews")
    .select("*")
    .where({ "review_id": review_id })
    .first();
}

function update(review) {
  return knex("reviews as r")
    .where({ "review_id": review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

async function setCritic(review) {
  review.critic = await getCritic(review.critic_id);
  return review;
}

function getCritic(critic_id) {
  return knex("critics").where({ "critic_id": critic_id }).first();
}

function destroy(review_id) {
  return knex("reviews")
    .select("*")
    .where({ "review_id": review_id })
    .del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};