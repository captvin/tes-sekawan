const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove, service } = require('@controllers/unit.controller')
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({
  storage:storage
})

const { LoggerMiddleware } = new LogRequest('UNIT_ROUTE')

Router
  .use(LoggerMiddleware, AuthGuard)
  .post('/', upload.single('image'), create)
  .patch('/:id', upload.single('image'), update)
  .patch('/service/:id', service)
  .get('/', findAll)
  .get('/:id', findById)
  .delete('/:id', remove)

module.exports = { Router, route: '/unit' }

