const express = require("express");

const Bucketlists = require("./bucketlist-model.js");

const router = express.Router();

// /home
// Read - Obtain all posts

router.get("/", async (req, res) => {
  try {
    const posts = await Bucketlists.get();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

// /home/:id
// Obtain post by id

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

//home
// Post a new Bucket List
// (needs fat update)

// router.post("/", async (req, res) => {
//   Bucketlists.insert(req.body)
//     .then(post => {
//       res.status(201).json(post);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Error Adding Item" });
//     });
// });

router.post('/', async (req, res) => {
  const post = req.body;
  try {
    const newPost = await Bucketlists.addPost(post);
    res.status(201).json(newPost);
  } catch(err) {
    res.status(500).json(err);
  }
})


// /home/:id
// Delete specific post

router.delete("/:id", validatePostId, async (req, res) => {
  try {
    const count = await Bucketlists.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The bucketlist has been deleted" });
    } else {
      res.status(404).json({ message: "The bucketlist could not be found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error removing the post"
    });
  }
});

// /home/:id
// Update - Update a specific post

router.put("/:id", validatePostId, async (req, res) => {
  try {
    const post = await Bucketlists.update(req.params.id, req.body);
    if (post) {
      res.status(200).json({ message: "Post has been updated" });
    } else {
      res.status(404).json({ message: "The post could not be updated." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Bucketlists.getById(id);

    if (post) {
      req.post = post;
      next();
    } else {
      res.status(500).json({ message: "Id not found!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to process" });
  }
}



module.exports = router;
