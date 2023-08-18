'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Members";
    return queryInterface.bulkInsert(
      options,
      [
        {
          projectId: 1,
          userId: 1
        },
        {
          projectId: 1,
          userId: 2
        },
        {
          projectId: 1,
          userId: 3
        },
        {
          projectId: 1,
          userId: 4
        },
        {
          projectId: 2,
          userId: 2
        },
        {
          projectId: 2,
          userId: 5
        },
        {
          projectId: 2,
          userId: 6
        },
        {
          projectId: 2,
          userId: 7
        },
        {
          projectId: 2,
          userId: 8
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Members";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        projectId: {
          [Op.in]: [1, 2],
        },
      },
      {}
    );
  }
};
