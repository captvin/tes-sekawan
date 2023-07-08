const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove, changePass } = require('@controllers/pegawai.controller')
const { LoggerMiddleware } = new LogRequest('PEGAWAI_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', create )
    .patch('/:id', update)
    .patch('/change-pass/:id', changePass)
    .delete('/:id', remove)

module.exports = { Router, route: '/pegawai' }

