

const express = require('express')

const {check, validationResult} = require("express-validator")

const router = express.Router()

const cityModel = require("../model/cityModel")

router.get("/all", (req, res) => {
    cityModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
});
/*
router.post('/add', (req, res) => {
    const newCity = new cityModel({
        name: req.body.name,
        country: req.body.country,
        img: req.body.img
    })
    console.log(newCity);
    newCity.save()
      .then(city => {
      res.send(city)
      })
      .catch(err => {
      res.status(500).send("Server error")})
      
});
*/
router.post(
    "/add",
    [
        check("name", "Name is required")
        .not()
        .isEmpty(),
        check("country", "Country is required")
        .not()
        .isEmpty()
      
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name,
            country,
            img
        } = req.body;
        try {
            
            city = new cityModel({
                name,
                country,
                img
            });
        await city.save()
        return res.json(city)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);



module.exports = router




