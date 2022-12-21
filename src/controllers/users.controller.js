const { User } = require('../models')
const bcrypt = require('bcryptjs')
const tokenLib = require('../utils/token')

const login = async (req, res) => {
  const userData = req.body

  try {
    let foundUser = await User.findOne({
      where: { email: userData.email },
      attributes: ['id', 'name', 'email', 'password']
    })

    if (!foundUser) {
      return res.status(404).json({
        code: 'user_login_not_found',
        message: 'E-mail ou senha inválidos.'
      })
    }

    const permit = await bcrypt.compare(userData.password, foundUser.password)

    if (!permit) {
      return res.status(404).json({
        code: 'user_login_not_found',
        message: 'E-mail ou senha inválidos.'
      })
    }

    const tokenPayload = {
      userId: foundUser.id
    }

    const responseData = {
      token: tokenLib.buildToken(tokenPayload),
      user: {
        name: foundUser.name,
        email: foundUser.email
      }
    }

    return res.status(200).json({ data: responseData })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      code: 'user_login_unknown_error',
      message: 'Erro desconhecido.'
    })
  }
}

const register = async (req, res) => {
  const userData = { ...req.body }

  try {
    let foundUser = await User.findAll({ where: { email: userData.email } })

    if (foundUser[0]) {
      return res.status(403).json({
        code: 'user_create_already_exists',
        message: 'Já existe um usuário com o e-mail informado.'
      })
    }

    userData.password = await bcrypt.hash(userData.password, 10)

    let user = await User.create(userData)

    return res.status(200).json({
      message: 'Usuário criado com sucesso!',
      data: user
    })
  } catch (error) {
    return res
      .status(500)
      .json({ code: 'user_create_unknown_error', error: error.message })
  }
}

module.exports = {
  login,
  register
}
