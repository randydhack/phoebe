// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Section, Card, Member} = require("../../db/models");

// ------------------------------------ GET ENDPOINTS ---------------------------------------------

// GET ALL CARDS
// I WANT TO GET ALL THE CARDS BASED ON THE PROJECT TO PREVENT LOADING ALL CARDS ON THE DATABASE
router.get('/', requireAuth, async (req, res, next) => {
    const cards = Card.findAll()

})


// ------------------------------------ POST ENDPOINTS ---------------------------------------------
router.post('/', requireAuth, async (req, res, next) => {
    const { sectionId, title, description } = req.body

    const section = await Section.findByPk(sectionId)

    if (!section) {
        const err = new Error("Section does not exist.");
        err.status = 404;
        return next(err);
    }

    const newCard = await Card.create({sectionId, title, userId: req.user.id, description})

    res.status(200).json(newCard)
})




module.exports = router;
