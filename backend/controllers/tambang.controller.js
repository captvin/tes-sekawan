const { tambang } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } =require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', tambang)) {
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
        where: {}
    }

    const { nama } = req.query

    if (nama) {
        options.where['nama'] = { [Op.like]: `%${nama}%` }
    }

    const result = await tambang.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', tambang)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const relations = []
    if (req.query.getTambang === 'true') {
        relations.push('driver', 'pemesanan')
    }
    const result = await tambang.findByPk(id)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', tambang)) {
        return next(Forbidden())
    }
    const { body } = req
    const nama = body.nama
    const already = await tambang.findOne({where: {nama}})

    if(already){
        return res.send({message: "Nama tambang already exists"})
    }
    else{
        const result = await tambang.create(body)
        res.json(result)
    }
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', tambang)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    nama = body.nama
    const already = await tambang.findOne({where:{[Op.and]: [{nama:{[Op.like]:nama}},{id:{[Op.ne]:id}}]} })

    if(already){
        return res.send({message: "Nama tambang already exists"})
    }
    else{
        const result = await tambang.update(body, {where: {id}})
        result[0]
            ? res.json({message: "berhasil update nama tambang menjadi "+ nama})
            : next(NotFound())
    }
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', tambang)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await tambang.destroy({ where: { id } })
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