// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Card, Comment, User } = require("../../db/models");

// ------------------------------------ GET ENDPOINTS ---------------------------------------------
// NOTES: GET ALL COMMENTS BY SECTION ID IS LOCATED IN CARD ROUTE


// GET ALL COMMENTS BY CARD ID
router.get("/:id", requireAuth, async (req, res, next) => {
  const comment = await Comment.findAll({where: {cardId: req.params.id}, include: { model: User, as: 'User'}});

  //  If comment does not exist send value
  if (comment) {
    res.status(200).json()
  }else {
    res.status(200).json(comment)
  }
});


// ------------------------------------ POST ENDPOINTS ---------------------------------------------

// CREATE A COMMENT WITHIN A CARD
router.post('/', requireAuth, async (req, res, next) => {
    const { cardId, comment } = req.body

    const card = await Card.findByPk(cardId)

    if (!card) {
        const err = new Error("Card does not exist.");
        err.status = 404;
        return next(err);
    }

    const newComment = await Comment.create({comment, cardId, userId: req.user.id})
    res.status(200).json(newComment)
})

// ------------------------------------ PUT ENDPOINTS ---------------------------------------------

// UPDATE COMMENT BY ID
router.put('/:id', requireAuth, async (req,res,next) => {
    const { comment } = req.body
    const getComment = await Comment.findOne({where: {id: req.params.id, userId: req.user.id}})

    if (!getComment) {
        const err = new Error("Comment belongs to another user.");
        err.status = 401;
        return next(err);
    }

    const updatedComment = await getComment.update({comment})
    res.status(200).json(updatedComment)
})

// ------------------------------------ DELETE ENDPOINTS ---------------------------------------------

router.delete('/:id', requireAuth, async (req, res, next) => {

    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      const err = new Error("Comment couldn't be found");
      err.status = 404;
      return next(err);
    }

    if (req.user.id === comment.userId) {
      await comment.destroy();

      res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      const err = new Error("User does not have permission");
      err.status = 401;
      return next(err);
    }


})
module.exports = router;
