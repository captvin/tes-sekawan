const { kantor } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } =require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', kantor)) {
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

    const { alamat } = req.query

    if (alamat) {
        options.where['alamat'] = { [Op.like]: `%${alamat}%` }
    }

    const result = await kantor.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', kantor)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const relations = []
    if (req.query.getKantor === 'true') {
        relations.push('pegawai')
    }
    const result = await kantor.findByPk(id)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', kantor)) {
        return next(Forbidden())
    }
    const { body } = req
    const nama_kantor = body.nama_kantor
    const already = await kantor.findOne({where: {nama_kantor}})

    if(already){
        return res.send({message: "Nama kantor already exists"})
    }
    else{
        const result = await kantor.create(body)
        res.json(result)
    }
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', kantor)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const nama_kantor = body.nama_kantor
    const already = await kantor.findOne({where:{[Op.and]: [{nama_kantor:{[Op.like]:nama_kantor}},{id:{[Op.ne]:id}}]} })

    if(already){
        return res.send({message: "Nama kantor already exists"})
    }
    else{
        const result = await kantor.update(body, {where: {id}})
        result[0]
            ? res.json({message: "Successfully updated"})
            : next(NotFound())
    }
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', kantor)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await kantor.destroy({ where: { id } })
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