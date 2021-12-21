const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { setAsync, getAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {

  const count = Number(await getAsync("added_todos")) + 1;
  await setAsync("added_todos", count);

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  // pre-made middleware did the magic for us
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  // implemented this
  const updated = await Todo.updateOne(req.todo, {
    ...req.body
  })
  res.send(updated);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
