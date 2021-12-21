const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { setAsync, getAsync } = require('../redis');

router.get('/', async (_, res) => {
  const count = Number(await getAsync("added_todos"));
  res.send({
    added_todos: count,
  });
});

module.exports = router;
