const express = require('express')
const router = express.Router()
const {storeFavorite, getFavorite, deleteFavorite}= require("../controllers/moviesController.js")


router.post('/favorite', storeFavorite)
router.get('/favorite', getFavorite)
router.delete('/favorite/:_id', deleteFavorite)


module.exports = router
