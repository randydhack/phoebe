// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Section, Card, Comment, User } = require("../../db/models");

// ------------------------------------ GET ENDPOINTS ---------------------------------------------

// NOTES: GET ALL CARDS BY PROJECT ID IS LOCATED IN PROJECT ROUTE

router.get("/:id", requireAuth, async (req, res, next) => {
  const card = await Card.findOne({
    where: { id: req.params.id },
    include: { model: User, as: "User" },
  });

  if (!card) {
    const err = new Error("Card does not exist.");
    err.status = 404;
    return next(err);
  }
  res.status(200).json(card);
});

// GET ALL COMMENTS IN A CARD
router.get("/:id/comments", requireAuth, async (req, res, next) => {
  const comment = await Comment.findAll({ where: { cardId: req.params.id } });

  if (!comment) {
    const err = new Error("Comment does not exist.");
    err.status = 404;
    return next(err);
  }

  res.status(200).json(comment);
});

router.get("/", requireAuth, async (req, res, next) => {
  const userCards = await Card.findAll({ where: { userId: req.user.id } });

  res.status(200).json(userCards);
});

// ------------------------------------ POST ENDPOINTS ---------------------------------------------

router.post("/", requireAuth, async (req, res, next) => {
  const { sectionId, title, projectId, bottom } = req.body;

  const section = await Section.findByPk(sectionId);
  const allCards = await Card.findAll({ where: { sectionId: sectionId } });

  if (!section) {
    const err = new Error("Section does not exist.");
    err.status = 404;
    return next(err);
  }

  if (allCards.length) {
    for (let i = 0; i < allCards.length; i++) {
      const cardJSON = allCards[i].toJSON();
      await allCards[i].update({ indexNumber: cardJSON.indexNumber + 1 });
    }
  }

  const newCard = await Card.create({
    sectionId,
    title,
    userId: req.user.id,
    projectId,
    indexNumber: bottom ? allCards.length : 0,
  });

  const result = await Card.findOne({
    where: { id: newCard.id },
    include: { model: User, as: "User" },
  });

  res.status(200).json(result);
});

// ------------------------------------ PUT ENDPOINTS ---------------------------------------------

router.put("/:id", requireAuth, async (req, res, next) => {
  const { title, description } = req.body;

  const card = await Card.findOne({
    where: { id: req.params.id },
    include: {
      model: User,
      as: "User",
    },
  });

  if (!card) {
    const err = new Error("Card does not exist.");
    err.status = 404;
    return next(err);
  }

  const updatedCard = await card.update({ title, description });
  res.status(200).json(updatedCard);
});

// move card section
router.put("/:id/section/:sectionId", async (req, res, next) => {
  const { id, sectionId, projectId, index } = req.body;

  const card = await Card.findOne({
    where: { id: id, projectId: projectId },
    include: {
      model: User,
      as: "User",
    },
  });

  if (!card) {
    const err = new Error("Card does not exist.");
    err.status = 404;
    return next(err);
  }

  const allCards = await Card.findAll({
    where: { sectionId: sectionId, projectId: projectId },
    include: {
      model: User,
      as: "User",
    },
    order: [["indexNumber", "ASC"]],
  });

  if (index === 0) {
    const updatedCard = await card.update({
      sectionId: Number(sectionId),
      indexNumber: index,
    });

    for (let i = index + 1; i < allCards.length; i++) {
        await allCards[i].update({
        indexNumber: i,
      });
    }
    return res.status(200).json(updatedCard);
  }

  if (allCards.length) {
    const updatedCard = await card.update({
      sectionId: Number(sectionId),
      indexNumber: index,
    });
    for (let i = index+1; i < allCards.length - index; i++) {
      const data = await allCards[i].update({
        indexNumber: i,
      });
    }
    return res.status(200).json(updatedCard);
  } else {
    const updated = await card.update({
      sectionId: sectionId,
      indexNumber: index,
    });
    return res.status(200).json(updated);
  }

  // return res.status(200).json(updatedCard);
});

// ------------------------------------ DELETE ENDPOINTS ---------------------------------------------

router.delete("/:id", requireAuth, async (req, res, next) => {
  const card = await Card.findByPk(Number(req.params.id));

  if (!card) {
    const err = new Error("Card does not exist.");
    err.status = 404;
    return next(err);
  }

  await card.destroy();
  res.status(200).json(card);
});

module.exports = router;
