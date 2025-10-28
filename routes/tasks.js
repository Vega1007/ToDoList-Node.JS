const express = require(`express`);
const router = express.Router();
const Task = require(`../models/task`);

router.get(`/`, async (req, res) => {
  if (!req.session.userId) {
    req.flash(`error_msg`, `Você precisa estar logado`);
    return res.redirect(`/auth`);
  }

  try {
    const tasks = await Task.getTasksByUser(req.session.userId);
    res.render(`tasks`, { tasks }); 
  } catch (error) {
    console.error(error);
    req.flash(`error_msg`, `Erro ao mostrar suas tarefas`);
    res.redirect(`/auth`);
  }
});

router.post(`/add`, async (req, res) => {
  if (!req.session.userId) {
    req.flash(`error_msg`, `Você precisa estar logado`);
    return res.redirect(`/auth`);
  }

  try {
    await Task.createTask(req.session.userId, req.body.title);
    res.redirect(`/tasks`);
  } catch (error) {
    console.error(error);
    req.flash(`error_msg`, `Erro ao adicionar tarefa`);
    res.redirect(`/tasks`);
  }
});

router.post(`/:id/done`, async (req, res) => {
  if (!req.session.userId) {
    req.flash(`error_msg`, `Você precisa estar logado`);
    return res.redirect(`/auth`);
  }

  try {
    const done = req.body.done === `true`;
    await Task.updateTaskStatus(req.params.id, done);
    req.flash(`success_msg`, `Tarefa concluida`);
    res.redirect(`/tasks`);
  } catch (error) {
    console.error(error);
    req.flash(`error_msg`, `Erro ao atualizar tarefa`);
    res.redirect(`/tasks`);
  }
});

router.post(`/:id/delete`, async (req, res) => {
  if (!req.session.userId) {
    req.flash(`error_msg`, `Você precisa estar logado`);
    return res.redirect(`/auth`);
  }

  try {
    await Task.deleteTask(req.params.id);
    req.flash(`success_msg`, `Tarefa exoluida`);
    res.redirect(`/tasks`);
  } catch (error) {
    console.error(error);
    req.flash(`error_msg`, `Erro ao deletar tarefa`);
    res.redirect(`/tasks`);
  }
});

module.exports = router;
