const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    try {
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.post('/tasks', (req, res) => {
    try {
        const task = { id: uuidv4(), ...req.body };
        tasks.push(task);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/tasks/:id', (req, res) => {
    try {
        const task = tasks.find(t => t.id === req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.put('/tasks/:id', (req, res) => {
    try {
        const taskIndex = tasks.findIndex(t => t.id === req.params.id);
        if (taskIndex > -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
            res.json(tasks[taskIndex]);
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.delete('/tasks/:id', (req, res) => {
    try {
        tasks = tasks.filter(t => t.id !== req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Server error');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
