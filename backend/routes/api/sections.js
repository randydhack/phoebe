// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Project, Section, Card, User} = require("../../db/models");

// ------------------------------------ GET ENDPOINTS ---------------------------------------------
// NOTES: GET ALL SECTIONS BY ID IS LOCATED IN THE PROJECT ROUTE

// **** GET SECTION BY ID ****
router.get("/:id", requireAuth, async (req, res, next) => {
  // Find Section by the ID
  const section = await Section.findByPk(req.params.id);

  //  If section does not exist, throw error
  if (!section) {
    const err = new Error("Section does not exist.");
    err.status = 404;
    return next(err);
  }
  // return json
  res.status(200).json(section);
});

// ------------------------------------ POST ENDPOINTS ---------------------------------------------

// CREATE A SECTION BY PROJECT ID
// Make where only owners can create Sections
router.post("/project/:id", requireAuth, async (req, res, next) => {
  // Body Request
  const { name } = req.body;
  //  Finds a Project where the owner belongs to and if the project exist
  const project = await Project.findOne({
    where: { id: req.params.id },
  });

  // If project does not exist, he is either not owner or does not have a project
  if (!project) {
    const err = new Error("Project does not exist.");
    err.status = 404;
    return next(err);
  }

  // Create the section with the name and project id
  const section = await Section.create({ name: name, projectId: project.id });

  // return json
  res.status(200).json(section);
});

// ------------------------------------ PUT ENDPOINTS ---------------------------------------------

// **** UPDATE SECTION BY ID ****
router.put("/:id", requireAuth, async (req, res, next) => {
  // Body Request
  const { name } = req.body;

  // Finds a section by ID
  const section = await Section.findOne({
    where: { id: req.params.id },
    include: [{
      model: Card,
      as: "Cards",
      separate: true,
      include: {
        model: User,
        as: "User",
      },
    },  {model: Project,
    as: 'Project'}]

  });

  // If section does not exist, throw error
  if (!section) {
    const err = new Error("Section does not exist.");
    err.status = 404;
    return next(err);
  }
  // if user is not the owner, throw error
  if (req.user.id !== section.Project.ownerId) {
    const err = new Error("User does not have permission");
    err.status = 401;
    return next(err);
  }

  // Update and return json
  await section.update({ name });
  res.status(200).json(section);
});

// ------------------------------------ DELETE ENDPOINTS ---------------------------------------------

// DELETE BY SECTION ID
router.delete("/:id", requireAuth, async (req, res, next) => {
  // Find Section by id
  const section = await Section.findOne({
    where: { id: req.params.id },
    include: {
      model: Project,
      as: "Project",
    },
  });

  // If section does not exist, throw error
  if (!section) {
    const err = new Error("Section couldn't be found");
    err.status = 404;
    return next(err);
  }
  // if user is not the owner, throw error

  // Destroy Section and return a successfull deletion
  await section.destroy();
  res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
