"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Projects";
    return queryInterface.bulkInsert(
      options,
      [
        {
          name: "Phoebe",
          ownerId: 1,
          description: "App Academy Capstone Project",
          projectImage: null,
          backgroundColor: '#22678e'
        },
        {
          name: "Project Fake",
          ownerId: 2,
          description: "Fake App Academy Project",
          projectImage: null,
          backgroundColor: '#3838c4'
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Projects";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: ["Phoebe", "Project Fake"],
        },
      },
      {}
    );
  },
};
