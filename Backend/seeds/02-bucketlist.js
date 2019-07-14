
exports.seed = function(knex, Promise) {
  return knex('bucketlist').insert([
    {
      user_id: 1,
      title: 'Hawaii',
      description: 'I cannont WAIT to go to Hawaii!!',
      journal_entry: 'Wowowowowowow Hawaiii wowowowowow hawaii wowowowow hawaiiiiiiiii!!!',
      completed: 0
    },
    {
      user_id: 2,
      title: 'Sleep',
      description: 'I have a dream to sleep for an entire day!',
      completed: 0
    },
    {
      user_id: 2,
      title: 'Japan was AMAZING',
      description: 'Exactly what I said in my title. :D',
      completed: 1
    },  
  ])
};
