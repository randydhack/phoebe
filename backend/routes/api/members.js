// // backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Section, Card, Comment, Member, Project } = require("../../db/models");

// // ------------------------------------ GET ENDPOINTS ---------------------------------------------

// GET ALL MEMBER PROJECTS

router.get(`/projects`, requireAuth, async (req, res, next) => {
  const memberProjects = await Member.findAll({
    where: { userId: req.user.id },
    include: { model: Project, as: "Project", where: {ownerId: { [Op.ne]: req.user.id} }},
  });

  res.status(200).json(memberProjects);
});

// // ------------------------------------ POST ENDPOINTS ---------------------------------------------

// // ------------------------------------ PUT ENDPOINTS ---------------------------------------------

// // ------------------------------------ DELETE ENDPOINTS ---------------------------------------------

module.exports = router;
