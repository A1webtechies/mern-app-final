const router = require("express").Router({ mergeParams: true });
const User = require("../models/user");
const Post = require("../models/assignment");
const { isLoggedIn, isSameUser } = require("../middleware/auth");

router.post("/", isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 201;

  const { userId } = req.params;
  const query = { _id: userId };
  const user = await User.findOne(query);

  user.assignments.push(req.body);
  await user.save();

  const assignments = user.assignments[user.assignments.length - 1];
  res.status(status).json({ status, response: assignments });
});

router.put("/:postId", isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200;

  const { postId, userId } = req.params;
  const query = { _id: userId };
  const user = await User.findOne(query);
  const assignments = user.assignments.id(postId);

  const { title, desc, proLink } = req.body;
  assignments.title = title;
  assignments.desc = desc;
  assignments.proLink = proLink;
  if (req.body.got) {
    assignments.grades.got = req.body.got;
  }
  if (req.body.total) {
    assignments.grades.total = req.body.total;
  }
  await user.save();

  res.status(status).json({ status, response: assignments });
});

router.delete("/:postId", isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200;

  const { postId, userId } = req.params;
  const query = { _id: userId };
  const user = await User.findOne(query);

  user.assignments = user.assignments.filter(assign => assign.id !== postId);
  await user.save();

  res.json({ status, response: user });
});

router.get("/ungraded", isLoggedIn, isSameUser, async (req, res) => {
  const users = User.find({});
  const assignmentsOfUsers = [];

  users.foreach(user => {
    assignmentsOfUsers = user.assignments;
  });

  const ungraded = assignmentsOfUsers.filter(
    assign => assign.grades.got === undefined
  );

  res.json({ status: 200, response: ungraded });
});

router.get("/graded", isLoggedIn, isSameUser, async (req, res) => {
  const users = User.find({});
  const assignmentsOfUsers = [];

  users.foreach(user => {
    assignmentsOfUsers = user.assignments;
  });

  const ungraded = assignmentsOfUsers.filter(
    assign => assign.grades.got !== undefined
  );

  res.json({ status: 200, response: ungraded });
});
module.exports = router;
