const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodInfoSchema = new Schema({
    emoji: { type: String, required: true, },
    name: { type: String, required: true, },
    unit: { type: String, },
    protein_per_unit: { type: Number, required: true, },
    carb_per_unit: { type: Number, required: true, },
    cal_per_unit: { type: Number, required: true, },
    fat_per_unit: { type: Number, required: true },
    chol_per_unit: { type: Number },
    sodium_per_unit: { type: Number },
    calcium_per_unit: { type: Number },
    iron_per_unit: { type: Number },
    magnesium_per_unit: { type: Number },
})

const FoodInfo = mongoose.model('FoodInfo', foodInfoSchema);

module.exports = FoodInfo;