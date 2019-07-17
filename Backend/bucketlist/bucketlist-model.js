const db = require('../database/dbConfig.js');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
    addPost
};


// Get all bucketlists from db

function get() {
    return db('bucketlist')
}


// Gets specific bucketlist by using the id

function getById(id) {
    return db('bucketlist')
      .where({ id })
      .first();
}

function insert(post) {
    return db('bucketlist')
      .insert(post)
      .then(ids => {
          return getById(ids[0]);
      });
}

function update(id, changes) {
    return db('bucketlist')
      .where({ id })
      .update(changes);
}

function remove(id) {
    return db('bucketlist')
      .where('id', id)
      .del();
}

function addPost(post) {
    return db('bucketlist').insert(post);
}


