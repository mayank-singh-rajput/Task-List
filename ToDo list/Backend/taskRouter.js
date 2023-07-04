const express = require('express')
const router = express.Router();

const Task = require('./task.model')

router.get('/select/:Name', async (req, res) => {
    const Name = req.params.Name
    try {
        const task = await Task.find({Name: Name})
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/insert', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        const response = await Task.findById(task._id) 
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
});


router.put('/update', async  (req, res)=>{
    const Name = req.body.Name
    const Title = req.body.Title
    const Description = req.body.Description
    try {
        const task = await Task.findOneAndUpdate({ Name: Name, Title: Title }, { Description: Description });
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }

});

router.put('/update/Status', async  (req, res)=>{
    const Name = req.body.Name
    const Title = req.body.Title
    const Status = req.body.Status
    try {
        const task = await Task.findOneAndUpdate({ Name: Name, Title: Title }, { Status: Status });
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.put('/update/State', async  (req, res)=>{
    const Name = req.body.Name
    const Title = req.body.Title
    const Status = req.body.Status
    try {
        const task = await Task.findOneAndUpdate({ Name: Name, Title: Title }, { Status: Status });
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/delete/:Name/:Title', async (req, res) => {
    const Name = req.params.Name
    const Title = req.params.Title
    try {
        const task = await Task.deleteOne({Name: Name, Title: Title})
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router