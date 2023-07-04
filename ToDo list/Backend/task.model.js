const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    Name: String,
    Title: String,
    Description: String,
    Status: String,
})


const Task = mongoose.model("TaskList", TaskSchema)

module.exports = Task;