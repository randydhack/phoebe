'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Comments";
    return queryInterface.bulkInsert(
      options,
      [
        {
          cardId: 1,
          userId: 1,
          comment: "please provide more details"
        },
        {
          cardId: 1,
          userId: 2,
          comment: "on it boss"
        },
        {
          cardId: 1,
          userId: 3,
          comment: "Send it my way, I can fix it"
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Comments";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        cardId: {
          [Op.in]: [1],
        },
      },
      {}
    );
  }
};
