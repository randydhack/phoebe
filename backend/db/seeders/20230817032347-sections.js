'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Sections";
    return queryInterface.bulkInsert(
      options,
      [
        {
          projectId: 1,
          name: "To dos"
        },
        {
          projectId: 1,
          name: "Complete"
        },
        {
          projectId: 2,
          name: "To dos"
        },
        {
          projectId: 2,
          name: "Complete"
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Sections";
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
