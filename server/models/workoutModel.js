const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        min: [0, "This needs to be bigger than 0"],
        required: true
    },
    load: {
        type: Number,
        min: [0, "This needs to be bigger than 0"],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)