const router = require('express').Router();
let Food = require('../models/food.model');

router.route('/').get((req, res) => {
    Food.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: '+err));
}); 
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const meal = Number(req.body.meal);
    const date = Date.parse(req.body.date);
    const calories = Number(req.body.calories);

    const newFood = new Exercise({
        username, 
        description,
        meal,
        date,
        calories
    });
    newFood.save()
    .then(() => res.json('Food added!'))
    .catch((err => res.status(400).json('Error: '+err)));
}); 
router.route('/:id').get((req, res)  => {
    Food.findById(req.params.id)
    .then(food => res.json(food))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) => {
    Food.findByIdAndDelete(req.params.id)
    .then(() => req.json('Food deleted'))
    .catch(err => res.status(400).son('Error: '+err));
});
router.route('/update/:id').post((req, res) => {
    Food.findById(req.params.id)
    .then(food => {
        food.username = req.body.username;
        food.description = req.body.description;
        food.meal = Number(req.body.meal);
        food.date = Date.parse(req.body.date);
        food.calories = Number(req.body.calories);

        food.save()
        .then(() => res.json('Food updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).son('Error: '+err));
});

module.exports = router; 