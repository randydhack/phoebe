'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Cards";
    return queryInterface.bulkInsert(
      options,
      [
        {
          title: "Fix Bug",
          description: "bug is in found in frontend",
          userId: 1,
          sectionId: 1,
          projectId: 1,
          indexNumber: 1024
        },
        {
          title: "Working on Login",
          description: "Login frontend css",
          userId: 2,
          sectionId: 1,
          projectId: 1,
          indexNumber: 2048
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Cards";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: {
          [Op.in]: [1, 2],
        },
      },
      {}
    );
  }
};
