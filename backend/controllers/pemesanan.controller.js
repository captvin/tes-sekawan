const { pemesanan, unit } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', pemesanan)) {
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

    const { pemesan, penyetuju, unit, driver, status_pesan, dari_tgl, sampai_tgl } = req.query

    if (pemesan) {
        options.where['pemesan'] = pemesan
    }
    if (penyetuju) {
        options.where['penyetuju'] = penyetuju
    }
    if (unit) {
        options.where['unit'] = unit
    }
    if (driver) {
        options.where['driver'] = driver
    }
    if (status_pesan) {
        options.where['status_pesan'] = status_pesan
    }
    if (dari_tgl && sampai_tgl) {
        options.where['tgl_pesan'] = { [Op.between]: [dari_tgl, sampai_tgl] }
    }

    const result = await pemesanan.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', pemesanan)) {
        return next(Forbidden())
    }
    const relations = []
    if (req.query.getDetail === 'true') {
        relations.push('transaksi')
    }
    const result = await pemesanan.findByPk(req.params.id, { include: relations })
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', (pemesanan))) {
        return next(Forbidden())
    }

    const { body } = req
    body.status_pesan = "menunggu"
    body.pemesan = req.user.id
    body.tgl_pesan = new Date().toISOString().substr(0, 10)
    const dipakai = await unit.findOne({ where: { id: body.unit } })
    console.log()

    if (dipakai.status_pesan === 'tidak_tersedia') {
        return res.json({ message: "unit dengan nomor unit " + dipakai.nomor_unit + " sedang dipakai" })
    }
    else {
        const result = await pemesanan.create(body)
        res.json(result)

    }
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', pemesanan)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const status = await pemesanan.findOne({ where: { id } })

    if (status.status_pesan !== "menunggu") {
        return res.json({ message: "Tidak bisa mengubah data pemesanan yang telah di konfirmasi atasan" }).status(401)
    }

    else {
        const result = await pemesanan.update(body, { where: { id } })
        result[0]
            ? res.json({ message: 'berhasil update' }).status(200)
            : next(NotFound())
    }
}

async function updatestatus(req, res, next) {
    if (req.user.abilities.cannot('update', pemesanan)) {
        return next(Forbidden())
    }
    const { id } = req.params
    let status_pesan = req.body.status_pesan
    const penyetuju = req.user.id
    let tgl_disetujui = new Date().toISOString().substr(0, 10)
    const status = await pemesanan.findOne({ where: { id }, attributes: ['status_pesan', 'unit'] })

    if (status_pesan === status.status_pesan || status.status_pesan === 'tidak_disetujui') {
        return res.json({ message: "Pesanan ini sudah " + status.status_pesan }).status(401)
    }

    else {
        if (status_pesan === "disetujui") {
            const result = await pemesanan.update({ tgl_disetujui, status_pesan, penyetuju }, { where: { id } })
            await unit.update({ status: 'tidak_tersedia', pemakaian: +1 }, { where: { id: status.unit } })
            result[0]
                ? res.json({ message: 'berhasil meengubah status pemesanan' }).status(200)
                : next(NotFound())
        }
        else {
            const result = await pemesanan.update({status_pesan, penyetuju}, { where: { id } })
            result[0]
                ? res.json({ message: 'berhasil meengubah status pemesanan' }).status(200)
                : next(NotFound())
        }
    }
}

async function selesai(req, res, next) {
    if (req.user.abilities.cannot('update', pemesanan)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const tgl_kembali = new Date().toISOString().substr(0, 10)
    const done = await pemesanan.findOne({ where: { id }, attributes: ['status_pesan', 'tgl_kembali', 'unit'] })

    if (done.status_pesan === 'tidak_disetujui' || done.tgl_kembali !== null) {
        return res.json({ message: "pesanan ini sudah tidak aktif" })
    }
    else {
        const result = await pemesanan.update({tgl_kembali}, { where: { id } })
        await unit.update({ status: 'tersedia' }, { where: { id: done.unit } })
        result[0]
            ? res.json({ message: 'konfirmasi pengembalian unit berhasil' }).status(200)
            : next(NotFound())
    }
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', pemesanan)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await pemesanan.destroy({ where: { id } })
    result === 1
        ? res.json({ message: 'Successfully deleted' })
        : next(NotFound())
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    updatestatus,
    selesai,
    remove
}
