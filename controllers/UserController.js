const { User } = require('../models')
const middleware = require('../middleware')
const { Op } = require('sequelize')

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    throw error
  }
}

const GetUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (error) {
    throw error
  }
}

const RegisterUser = async (req, res) => {
  try {
    const {
      username,
      image,
      firstName,
      lastName,
      description,
      email,
      password,
      phoneNumber,
      gender
    } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      username,
      image,
      firstName,
      lastName,
      description,
      email,
      passwordDigest,
      phoneNumber,
      gender
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const CreateUser = async (req, res) => {
  try {
    let userBody = { ...req.body }
    const createdUser = await User.create(userBody)
    res.send(createdUser)
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.id)
    await User.destroy({ where: { id: userId } })
    res.send({ message: `Deleted user with and id of ${userId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetUsers,
  GetUserById,
  RegisterUser,
  CreateUser,
  DeleteUser
}
