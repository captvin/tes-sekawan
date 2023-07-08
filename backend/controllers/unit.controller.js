const { unit } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const imagePath = path.join(__dirname, '..', 'image')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', unit)) {
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
        where: {}
    }

    const { nomor_unit, nama_model, jenis_BBM, jenis_angkutan, status } = req.query

    if (jenis_BBM) {
        options.where['jenis_BBM'] = jenis_BBM
    }
    if (jenis_angkutan) {
        options.where['jenis_angkutan'] = jenis_angkutan
    }
    if (status) {
        options.where['status'] = status
    }
    if (nomor_unit) {
        options.where['nomor_unit'] = { [Op.like]: `%${nomor_unit}%` }
    }
    if (nama_model) {
        options.where['nama_model'] = { [Op.like]: `%${nama_model}%` }
    }

    const result = await unit.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)
    const rowsWithImageData = result.rows.map((row) => {
        const imagePath = path.join(__dirname, '..', 'image', row.image);
        const image = fs.readFileSync(imagePath, { encoding: 'base64' });
        const imageData = `data:image/png;base64,${image}`;
        return { ...row.dataValues, imageData };
    })
    
    res.json({ currentPage: page, totalPage, rowLimit: limit, rowsWithImageData })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', unit)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const relations = []
    if (req.query.getUnit === 'true') {
        relations.push('pemesanan')
    }
    let result = await unit.findByPk(id)
    if (result) {
        const imagePath = path.join(__dirname, '..', 'image', result.image)
        const image = fs.readFileSync(imagePath, { encoding: 'base64' })
        const imageData = `data:image/png;base64,${image}`
        res.json({result,imageData})
    } else {
        next(NotFound());
    }
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', unit)) {
        return next(Forbidden())
    }
    const { body } = req
    const image = req.file?.originalname
    const nomor_unit = body.nomor_unit
    body.status = 'tersedia'
    const already = await unit.findOne({ where: { nomor_unit } })
    if (!image) {

        if (already) {
            return res.send({ message: "Tipe already exists" })
        }
        else {
            body.image = "no_image.jpg"
            const result = await unit.create(body)
            res.send(result)
        }
    }

    else {
        if (already) {
            return res.send({ message: "Tipe already exists" })
        }
        else {
            const img_name = "img-" + Date.now() + path.extname(image)
            body.image = img_name
            const buf = req.file.buffer
            fs.writeFileSync(path.join(imagePath, img_name), buf)
            const result = await unit.create(body)
            res.send({result})
        }
    }

}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', unit)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const nomor_unit = body.nomor_unit
    const already = await unit.findOne({ where: { [Op.and]: [{ nomor_unit: { [Op.like]: nomor_unit } }, { id: { [Op.ne]: id } }] } })
    const image = req.file?.originalname

    if (!image) {
        if (already) {
            return res.json({ message: "Tipe already exists" })
        }
        else {

            const data = await unit.findOne({ where: { id } })
            body.image = (data.image)
            const result = await unit.update(body, { where: { id } })
            result[0]
                ? res.json({ message: 'successfully updated' })
                : next(NotFound())
        }
    }
    else {
        if (already) {
            return res.send({ message: "Unit already exists" })
        }
        else {
            const data = await unit.findOne({ where: { id } })
            const img_name = "img-" + Date.now() + path.extname(image)
            body.image = img_name

            if (data.image !== "no_image.jpg") {
                fs.unlinkSync(path.join(imagePath, data.image))
                const buf = req.file.buffer
                fs.writeFileSync(path.join(imagePath, img_name), buf)
                const result = await unit.update(body, { where: { id } })
                result[0]
                    ? res.json({ message: 'Successfully updated' })
                    : next(NotFound())

            }
            else {
                const buf = req.file.buffer
                fs.writeFileSync(path.join(imagePath, img_name, buf))
                const result = await unit.update(body, { where: { id } })
                result[0]
                    ? res.json({ message: 'Successfully updated', })
                    : next(NotFound())
            }

        }
    }


}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', unit)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const data = await unit.findOne({ where: { id } })

    if (data.image = "no_image.jpg") {
        const result = await unit.destroy({ where: { id } })
        result === 1
            ? res.json({ message: "successfully deleted" })
            : next(NotFound())
    }
    else {
        fs.unlinkSync(path.join(imagePath, data.image))
        const result = await unit.destroy({ where: { id } })
        result === 1
            ? res.json({ message: 'Successfully deleted' })
            : next(NotFound())
    }


}

async function service(req, res, next) {
    if (req.user.abilities.cannot('read', unit)) {
        return next(Forbidden())
    }
    const { id } = req.params
    let terakhir_service = new Date().toISOString().substr(0, 10)
    const result = await unit.update({terakhir_service}, {where: {id}})
    result[0]
        ? res.json({message: 'unit telah diservice pada tanggal '+ terakhir_service})
        : next(NotFound())
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    service
}