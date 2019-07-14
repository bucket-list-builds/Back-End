// const db = require("../database/dbConfig.js");

// module.exports = {
//   add,
//   getAll,
//   findBy,
//   findById
// };

// function getAll() {
//   return db("bucketlist");
// }

// function add(bl) {
//   return db("bucketlist")
//     .insert(bl)
//     .then(ids => {
//       return findById(ids[0]);
//     });
// }

// function findBy(filter) {
//   return db("bucketlist").where(filter);
// }

// function findByIds(id) {
//   return db("bucketlist")
//     .where({ id })
//     .first();
// }
