'use strict'
const { Review, User, Zodiac, sequelize } = require('../models')
const falso = require('@ngneat/falso')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = await Promise.all(
      [...Array(100)].map(async () => {
        let user = await User.findOne({ order: sequelize.random(), raw: true })
        let zodiac = await Zodiac.findOne({
          order: sequelize.random(),
          raw: true
        })
        return {
          rating: falso.randNumber({ min: 1, max: 5 }),
          title: falso.randCatchPhrase(),
          description: falso.randQuote(),
          userId: user.id,
          zodiacId: zodiac.id,
          likes: falso.randNumber({ min: 10, max: 20 }),
          dislikes: falso.randNumber({ min: 0, max: 5 }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    await queryInterface.bulkInsert('reviews', reviews)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('reviews', null, {})
  }
}
