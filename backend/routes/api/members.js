// // backend/routes/api/session.js
// const express = require("express");
// const router = express.Router();
// const { Op } = require("sequelize");
// const { requireAuth } = require("../../utils/auth");
// const { Section, Card, Comment, Member } = require("../../db/models");

// // ------------------------------------ GET ENDPOINTS ---------------------------------------------

// // NOTES: GET ALL CARDS ISLOCATED IN PROJECT ROUTE

// // GET ALL COMMENTS IN A CARD
// router.get('/:id/comments', requireAuth, async (req, res, next) => {
//     const comment = await Comment.findAll({where: {cardId: req.params.id}})

//     if (!comment) {
//         const err = new Error("Comment does not exist.");
//         err.status = 404;
//         return next(err);
//     }

//     res.status(200).json(comment)
// })
// // ------------------------------------ POST ENDPOINTS ---------------------------------------------

// router.post("/", requireAuth, async (req, res, next) => {
//   const { sectionId, title, description, projectId } = req.body;

//   const section = await Section.findByPk(sectionId);

//   if (!section) {
//     const err = new Error("Section does not exist.");
//     err.status = 404;
//     return next(err);
//   }

//   const newCard = await Card.create({
//     sectionId,
//     title,
//     userId: req.user.id,
//     description,
//     projectId,
//   });

//   res.status(200).json(newCard);
// });

// // ------------------------------------ PUT ENDPOINTS ---------------------------------------------

// router.put("/:id", requireAuth, async (req, res, next) => {
//   const { title, description } = req.body;

//   const card = await Card.findByPk(req.params.id);

//   if (!card) {
//     const err = new Error("Card does not exist.");
//     err.status = 404;
//     return next(err);
//   }

//   const updatedCard = await card.update({ title, description });
//   res.status(200).json(updatedCard);
// });

// // ------------------------------------ DELETE ENDPOINTS ---------------------------------------------

// router.delete("/:id", requireAuth, async (req, res, next) => {
//   const card = await Card.findByPk(req.params.id);

//   if (!card) {
//     const err = new Error("Card does not exist.");
//     err.status = 404;
//     return next(err);
//   }

//   await card.destroy();
//   res.status(200).json({
//     message: "Successfully deleted",
//     statusCode: 200,
//   });
// });

// module.exports = router;