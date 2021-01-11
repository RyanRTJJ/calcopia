const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodEntrySchema = new Schema({
    mongoID: { type: String, required: true },
    quantity: { type: Number, required: true },
})

const dailySheetSchema = new Schema({
    date: { type: String, required: true },
    food_entries: [foodEntrySchema]
})

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    daily_sheets: [dailySheetSchema]
})

const User = mongoose.model('user', userSchema);

module.exports = User;