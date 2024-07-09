const getAllTasks = (req, res) => {
    res.send('This is all items')
}

const createTasks = (req, res) => {
    res.send('Creates a task')
}

const getTask = (req, res) => {
    res.send('Gets a single task')
}

const updateTasks = (req, res) => {
    res.send('update a task')
}

const deleteTasks = (req, res) => {
    res.send('Deletes a task')
}

module.exports = {
    getAllTasks,
    createTasks,
    getTask,
    updateTasks,
    deleteTasks
}