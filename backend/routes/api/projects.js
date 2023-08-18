// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Project, Section, Member } = require("../../db/models");

// ------------------------------------ GET ENDPOINTS ---------------------------------------------

// **** GET ALL PROJECT FOR A SINGLE USER ****
router.get("/", requireAuth, async (req, res) => {
  // Finds all the projects user owns or belongs to
  const userProjects = await Project.findAll({
    where: { ownerId: req.user.id },
    include: [
      {
        model: Section,
      },
    ],
  });
  //  return json
  res.status(200).json(userProjects);
});

// **** GET PROJECT BY ID, only if they are a member of the Project ****
router.get("/:id", requireAuth, async (req, res, next) => {
  // Finds project by id
  const project = await Project.findByPk(req.params.id);
  // Finds if user is a member of the project
  const member = await Member.findOne({
    where: { projectId: req.params.id, userId: req.user.id },
  });

  // if user is not a member or a project does not exist, throw error
  if (!project || !member) {
    const err = new Error("Project does not exist.");
    err.status = 404;
    return next(err);
  }

  // return json
  res.status(200).json(project);
});

// **** GET ALL SECTIONS BY PROJECT ID ****
router.get("/:id/sections", async (req, res) => {
  const sections = await Section.findAll({
    where: { projectId: req.params.id },
  });

  res.status(200).json(sections);
});

// ------------------------------------ POST ENDPOINTS ---------------------------------------------

// ***** CREATES A NEW PROJECT *****
router.post("/", requireAuth, async (req, res, next) => {
  // Body request from form
  const { name, category, description, projectImage } = req.body;
  // Finds existing project by name and id to prevent same Project name
  const existingProject = await Project.findOne({
    where: { name: name, ownerId: req.user.id },
  });

  // If the project name exist by user, throw error
  if (
    existingProject &&
    name.toLowerCase() === existingProject["name"].toLowerCase()
  ) {
    const err = new Error("Project name already exist.");
    err.status = 401;
    return next(err);
  }

  // Creates a new project, name and ownerId is required
  const project = await Project.create({
    name,
    ownerId: req.user.id,
    category,
    description,
    projectImage,
  });

  // Sets the user as a member of the Project as well
  await Member.create({ projectId: project.id, userId: req.user.id });
  // Create a default To do Section
  await Section.create({ name: "To dos", projectId: project.id });
  // return json
  res.status(201).json(project);
});

// ------------------------------------ PUT ENDPOINTS ---------------------------------------------

// **** UPDATES PROJECT BY ID, only if user is owner of project ****
router.put("/:id", requireAuth, async (req, res, next) => {
  // Body request from form
  const { name, category, description, projectImage } = req.body;

  // Finds project by user id and project id so only owners can edit
  const project = await Project.findOne({
    where: { id: req.params.id, ownerId: req.user.id },
  });

  // throws error if project doesnt exist
  if (!project) {
    const err = new Error("Project does not exist.");
    err.status = 404;
    return next(err);
  }

  // Updates the project details
  await project.update({ name, category, description, projectImage });

  // return json
  res.status(200).json(project);
});

// ------------------------------------ DELETE ENDPOINTS ---------------------------------------------

// DELETE PROJECT BY ID
router.delete("/:id", requireAuth, async (req, res, next) => {

  const project = await Project.findByPk(req.params.id);

  if (!project) {
    const err = new Error("Project couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (req.user.id === project.ownerId) {
    await project.destroy();

    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    const err = new Error("User does not have permission");
    err.status = 404;
    return next(err);
  }
});

module.exports = router;
