// // backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Member, Project, User } = require("../../db/models");
const { validateInvite } = require("../../utils/validation");

// // ------------------------------------ GET ENDPOINTS ---------------------------------------------

// GET ALL MEMBER PROJECTS

router.get(`/projects`, requireAuth, async (req, res, next) => {
  const memberProjects = await Member.findAll({
    where: { userId: req.user.id },
    include: {
      model: Project,
      as: "Project",
      where: { ownerId: { [Op.ne]: req.user.id } },
    },
  });

  res.status(200).json(memberProjects);
});

router.get("/project/:id", requireAuth, async (req, res, next) => {
  const members = await Member.findAll({
    where: { projectId: Number(req.params.id) },
    include: { model: User, as: "User" },
  });

  res.status(200).json(members);
});

// // ------------------------------------ POST ENDPOINTS ---------------------------------------------

router.post(
  "/project/:id",
  validateInvite,
  requireAuth,
  async (req, res, next) => {
    const { email } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      const err = new Error("No user found with this email.");
      err.status = 401;
      return next(err);
    }

    const project = await Project.findByPk(Number(id));

    if (project.ownerId !== req.user.id) {
      const err = new Error("User does not have permission to invite");
      err.status = 401;
      return next(err);
    }

    const member = await Member.findOne({
      where: { userId: user.id, projectId: Number(id) },
    });

    if (member) {
      const err = new Error("User is already a member.");
      err.status = 401;
      return next(err);
    }

    const newMember = await Member.create({
      userId: user.id,
      projectId: Number(id),
    });
    const result = await Member.findOne({
      where: { id: newMember.id },
      include: { model: User, as: "User" },
    });

    res.status(200).json(result);
  }
);

// // ------------------------------------ PUT ENDPOINTS ---------------------------------------------

router.put("/project/:id", async (req, res, next) => {
  const { memberId } = req.body;

  const project = await Project.findOne({
    where: {
      id: req.params.id,
      ownerId: req.user.id,
    },
    include: [
      {
        model: Member,
        as: "Members",
        include: {
          model: User,
          as: "User",
        },
      },
      {
        model: User,
        as: "Owner",
      },
    ],
  });

  const member = await Member.findOne({where: {id: memberId}, include: {model: User, as: 'User'}});

  if (!member) {
    const err = new Error("User is not part of the project.");
    err.status = 401;
    return next(err);
  }

  if (!project) {
    const err = new Error(
      "User does not have permission or is not the owner of the project."
    );
    err.status = 401;
    return next(err);
  }

  if (member.userId === project.ownerId) {
    const err = new Error("User is already the owner.");
    err.status = 401;
    return next(err);
  }

  await project.update({ ownerId: member.userId });
  res
    .status(200)
    .json({ message: "Tranfer of ownership is successful", project, member });
});

// // ------------------------------------ DELETE ENDPOINTS ---------------------------------------------

router.delete("/project/:id", async (req, res, next) => {
  const member = await Member.findOne({
    where: { userId: req.user.id, projectId: Number(req.params.id) },
  });

  const project = await Project.findByPk(member.projectId);

  if (project.ownerId === req.user.id) {
    const err = new Error("Owner cannot leave project.");
    err.status = 404;
    return next(err);
  }

  if (!member) {
    const err = new Error("Member does not exist.");
    err.status = 404;
    return next(err);
  }

  await member.destroy();

  res.status(200).json({ message: "Successfully Deleted", statusCode: 200 });
});

router.delete("/remove/project/:id", async (req, res, next) => {
  const { userId } = req.body

  const member = await Member.findOne({
    where: { userId: userId, projectId: Number(req.params.id) },
  });

  const project = await Project.findByPk(Number(req.params.id));

  if (project.ownerId === userId) {
    const err = new Error("Owner cannot leave project.");
    err.status = 404;
    return next(err);
  }

  if (!member) {
    const err = new Error("Member does not exist.");
    err.status = 404;
    return next(err);
  }

  await member.destroy();

  res.status(200).json({ message: "Successfully Deleted", statusCode: 200 });
})

module.exports = router;
