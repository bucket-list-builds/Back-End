const db = require('../database/dbConfig.js');

module.exports = {
    add, 
    find,
    findBy,
    findById,
    getUserBucketList
};


function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users').where(filter);
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
      .where({ id })
      .first();
}

function getUserBucketList(userId) {
    return db('bucketlist as b')
      .join('users as u', 'u.id', 'b.user_id')
      .select('b.id', 'b.title', 'b.description', 'b.journal_entry', 'b.created_at', 'b.photo', 'b.completed')
      .where('b.user_id', userId);
  }