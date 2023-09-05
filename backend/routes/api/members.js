// // backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Member, Project, User } = require("../../db/models");

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

router.post('/project/:id', requireAuth, async (req, res, next) => {
  console.log('dsadsadhskdjkasdljksadkjlasdjksaldsad')
  const { email } = req.body
  const { id } = req.params
  console.log(email)
  const user = await User.findOne({where: {email: email}})

  if (!user) {
    const err = new Error("No user found with this email.");
    err.status = 401;
    return next(err);
  }

  console.log(user)
  const member = await Member.findOne({where: {userId: user.id, projectId: Number(id)}})

  if (member) {
    const err = new Error("User is already a member.");
    err.status = 401;
    return next(err);
  }

  const newMember = await Member.create({userId: user.id, projectId: Number(id)})
  // const result = await Member.findOne({where: {id: newMember.id}, include: { model}})

  res.status(200).json(newMember)
})

// // ------------------------------------ PUT ENDPOINTS ---------------------------------------------

// // ------------------------------------ DELETE ENDPOINTS ---------------------------------------------

router.delete('/project/:id', async (req, res, next) => {

  const member = await Member.findOne({where: {userId: req.user.id, projectId: Number(req.params.id)}})

  const project = await Project.findByPk(member.projectId)

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

  await member.destroy()

  res.status(200).json({message: 'Successfully Deleted', statusCode: 200})
})


module.exports = router;
