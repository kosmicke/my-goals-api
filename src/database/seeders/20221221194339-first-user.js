'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: '10e668b7-a08f-4f00-b034-af9ffe280fa5',
        name: 'André Rodrigues',
        email: 'andre.cs.rodrigues@gmail.com',
        password: 'admin123',
        birthDate: new Date('07/16/1998'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {
      id: '10e668b7-a08f-4f00-b034-af9ffe280fa5'
    })
  }
}
