const router = require("express").Router();

const Users = require("./users-model.js");
const Bucketlist = require("../bucketlist/bucketlist-model.js");

// /users
// Get all users

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// /users/:id
// Read - Obtain info of specific user

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// /users/:id/bucketlist
// Read - Obtain all bucketlists of user

router.get("/:id/bucketlist", validateUserId, async (req, res) => {
  try {
    const posts = await Users.getUserBucketList(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error getting posts from hub" });
  }
});

// /users/:id/bucketlist
//  Create - Create new bucketlist for specific user

router.post(
  "/:id/bucketlist",
  validateUserId,
  validatePost,
  async (req, res) => {
    const postsInfo = { ...req.body, user_id: req.params.id };

    try {
      const post = await Bucketlist.insert(postsInfo);
      res.status(210).json(post);
    } catch (error) {
      res.status(500).json({ message: "Error creating the bucketlist" });
    }
  }
);

// Custom Middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "Invalid user id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to process request" });
  }
}

function validatePost(req, res, next) {
  if (!req.body.title || !req.body.description) {
    res.status(400).json({ message: "Please provide title, description" });
  } else if (req.body && Object.keys(req.body).length) {
    next();
  }
}

module.exports = router;
