const { pegawai } = require('@models')
const { tokenGenerator } = require('@utils/tokenGenerator')
const bcrypt = require('bcrypt');


async function login(req, res, next) {
    const { username } = req.body

    const result = await pegawai.findOne({ where: { username } })
    if (!result) {
        return res.json({ message: "Pegawai not found" }).status(401)
    }

    const { password } = req.body
    const password_match = await bcrypt.compare(password, result.password)

    if (password_match) {
        const id = (result.id)
        const role = (result.role)
        const username = (result.username)
        const token = await tokenGenerator({ id, role, username })
        return res.json({
            logged: true,
            data: result,
            token: token,
        }).status(200)

    }

    else {
        return res.json({
            message: "Wrong password",
        }).status(401)
    }


}

module.exports = {
    login
}





