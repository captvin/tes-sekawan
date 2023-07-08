const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')
const { findAll, findById, create, update, remove } = require('@controllers/driver.controller')
const { LoggerMiddleware } = new LogRequest('DRIVER_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .post('/', create)
    .patch('/:id', update)
    .get('/', findAll)
    .get('/:id', findById)
    .delete('/:id', remove)

module.exports = { Router, route: '/driver' }