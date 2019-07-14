
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: 'Reyaad', password: 'abc123' },
    { username: 'Max', password: 'apple123' }
  ])
};
