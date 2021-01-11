const router = require('express').Router();
let FoodInfo = require('../models/foodinfo.model');
const auth = require('../middleware/auth');

router.route('/').get((req, res) => {
    FoodInfo.find()
        .then(foodInfos => res.json(foodInfos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/getOneConsumedFood", auth, async (req, res) => {
    try {
        FoodInfo.findById(req.body.id)
            .then(foodInfo => res.json({ ...foodInfo._doc, quantity: req.body.quantity}))
            .catch(err => res.status(400).json({ msg: err, value: 1 }));
    }
    catch (err) {
        res.json({ msg: err, value: -1 });
    }
});

// Ternary operators here are just error-checking in case of null values
router.route('/add').post((req, res) => {
    const emoji = decodeURIComponent(req.body.emoji);
    const name = req.body.name.toLowerCase();
    const unit = req.body.unit.toLowerCase();
    const protein_per_unit = req.body.protein_per_unit ? Number(req.body.protein_per_unit) : req.body.protein_per_unit;
    const carb_per_unit = req.body.carb_per_unit ? Number(req.body.carb_per_unit) : req.body.carb_per_unit;
    const cal_per_unit = req.body.cal_per_unit ? Number(req.body.cal_per_unit) : req.body.cal_per_unit;
    const fat_per_unit = req.body.fat_per_unit ? Number(req.body.fat_per_unit) : req.body.fat_per_unit;
    const chol_per_unit = req.body.chol_per_unit ? Number(req.body.chol_per_unit) : req.body.chol_per_unit;
    const sodium_per_unit = req.body.sodium_per_unit ? Number(req.body.sodium_per_unit) : req.body.sodium_per_unit;
    const calcium_per_unit = req.body.cal_per_unit ? Number(req.body.cal_per_unit) : req.body.cal_per_unit;
    const iron_per_unit = req.body.iron_per_unit ? Number(req.body.iron_per_unit) : req.body.iron_per_unit;
    const magnesium_per_unit = req.body.magnesium_per_unit ? Number(req.body.magnesium_per_unit) : req.body.magnesium_per_unit;
    
    const newFoodInfo = new FoodInfo({
        emoji: emoji,
        name: name,
        unit: unit,
        protein_per_unit: protein_per_unit,
        carb_per_unit: carb_per_unit,
        cal_per_unit: cal_per_unit,
        fat_per_unit: fat_per_unit,
        chol_per_unit: chol_per_unit,
        sodium_per_unit: sodium_per_unit,
        calcium_per_unit: calcium_per_unit,
        iron_per_unit: iron_per_unit,
        magnesium_per_unit: magnesium_per_unit
    })

    newFoodInfo.save()
        .then(() => res.json('New Food Label added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').post((req, res) => {
    FoodInfo.findByIdAndDelete(req.params.id)
        .then(() => res.json('Food label deleted.'))
        .catch(err => res.status(400).json('Error: '+ err));
})

router.route('/update/:id').post((req, res) => {
    FoodInfo.findById(req.params.id)
        .then(foodinfo => {
            foodinfo.emoji = decodeURIComponent(req.body.emoji);
            foodinfo.name = req.body.name.toLowerCase();
            foodinfo.unit = req.body.unit.toLowerCase();
            foodinfo.protein_per_unit = req.body.protein_per_unit ? Number(req.body.protein_per_unit) : req.body.protein_per_unit;
            foodinfo.carb_per_unit = req.body.carb_per_unit ? Number(req.body.carb_per_unit) : req.body.carb_per_unit;
            foodinfo.cal_per_unit = req.body.cal_per_unit ? Number(req.body.cal_per_unit) : req.body.cal_per_unit;
            foodinfo.fat_per_unit = req.body.fat_per_unit ? Number(req.body.fat_per_unit) : req.body.fat_per_unit;
            foodinfo.chol_per_unit = req.body.chol_per_unit ? Number(req.body.chol_per_unit) : req.body.chol_per_unit;
            foodinfo.sodium_per_unit = req.body.sodium_per_unit ? Number(req.body.sodium_per_unit) : req.body.sodium_per_unit;
            foodinfo.calcium_per_unit = req.body.cal_per_unit ? Number(req.body.cal_per_unit) : req.body.cal_per_unit;
            foodinfo.iron_per_unit = req.body.iron_per_unit ? Number(req.body.iron_per_unit) : req.body.iron_per_unit;
            foodinfo.magnesium_per_unit = req.body.magnesium_per_unit ? Number(req.body.magnesium_per_unit) : req.body.magnesium_per_unit;

            foodinfo.save()
                .then(() => res.json('Food label updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;