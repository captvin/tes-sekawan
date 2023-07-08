const { pegawai } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')
const { hashPass } = require('@utils/hashPass')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', pegawai)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15


    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [
            ['createdAt', 'ASC']
        ],
        where: {},
        attributes: { exclude: ['password'] },
        include: 'kantor'
    }

    const { role, username, nama } = req.query

    if (role) {
        options.where['role'] = role
    }
    if (username) {
        options.where['username'] = { [Op.like]: `%${username}%` }
    }
    if (nama) {
        options.where['nama'] = { [Op.like]: `%${nama}%` }
    }


    const result = await pegawai.findAndCountAll(options);
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', pegawai)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const relations = ['kantor']
    // if (req.query.getPegawai === 'true') {
    //     relations.push('pemesanan')
    // }
    const result = await pegawai.findByPk(id, { include: relations })
    result
        ? res.send(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', pegawai)) {
        return next(Forbidden())
    }

    const { body } = req
    body.password = await hashPass(body.password)
    const username = body.username
    const already = await pegawai.findOne({ where: { username } })

    if (already) {
        return res.send({ message: "Username already to use" })
    }
    else {
        const result = await pegawai.create(body)
        const { password, ...responseData } = result.toJSON();
        res.send(responseData);
    }
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', pegawai)) {
        return next(Forbidden())
    }

    const { id } = req.params
    const { body } = req
    const username = body.username
    const already = await pegawai.findOne({ where: { [Op.and]: [{ username: { [Op.like]: username } }, { id: { [Op.ne]: id } }] } })


    if (already) {
        return res.json({ message: "Username already to use" })
    }
    else {
        const data = await pegawai.findOne({ where: { id } })
        body.password = (data.password)
        const result = await pegawai.update(body, { where: { id } })
        result[0]
            ? res.json({ message: "successfully updated" })
            : next(NotFound())
    }
}

async function changePass(req, res, next) {
    const { abilities } = req.user
    let user = await pegawai.findByPk(req.params.id)
    if (!user) {
        return next(NotFound())
    } else if (abilities.cannot('update', pegawai)) {
        return next(Forbidden())
    }

    const password = await hashPass(req.body.password)
    await pegawai.update({ password })
    return res.send({
        message: "Successfully changed pegawai's password"
    })
}


async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', pegawai)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await pegawai.destroy({ where: { id } })
    result === 1
        ? res.json({ message: "successfully deleted" })
        : next(NotFound())

}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    changePass
}