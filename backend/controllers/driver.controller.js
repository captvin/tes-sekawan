const { driver } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', driver)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [
            ['createdAt', 'ASC']
        ],
        where: {},
        include: 'tambang'
    }

    const { nama, penempatan_tambang } = req.query

    if (penempatan_tambang) {
        options.where['penempatan_tambang'] = penempatan_tambang
    }
    if (nama) {
        options.where['nama'] = { [Op.like]: `%${nama}%` }
    }

    const result = await driver.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result, })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', driver)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const relations = []
    if (req.query.getDriver === 'true') {
        relations.push('pemesanan')
    }
    const result = await driver.findByPk(id, { include: relations })
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', driver)) {
        return next(Forbidden())
    }
    const { body } = req
    const result = await driver.create(body)
    res.json(result)

}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', driver)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const result = await driver.update(body, { where: { id } })
    result[0]
        ? res.json({ message: "Successfully updated nama driver menjadi " + body.nama })
        : next(NotFound())
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', driver)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await driver.destroy({ where: { id } })
    result === 1
        ? res.json({ message: 'Successfully deleted' })
        : next(NotFound())
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}