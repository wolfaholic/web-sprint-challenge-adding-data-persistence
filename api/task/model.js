// build your `Task` model here
// build your `Task` model here
const db = require('../../data/dbConfig')

async function getTasks() {
    const tasks = await db('tasks as t')
        .join('projects as p', 'p.project_id', 't.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description')

    const tasksArray = tasks.map(tsk => {
        const trueOrFalse = (integer) => {
            if (integer === 0) {
                return false
            } else {
                return true
            }
        }
        return {
            task_id: tsk.task_id,
            task_description: tsk.task_description,
            task_notes: tsk.task_notes,
            task_completed: trueOrFalse(tsk.task_completed),
            project_name: tsk.project_name,
            project_description: tsk.project_description
        }
    })

    return tasksArray
}

async function insertTask(requestBody) {
    const newTaskId = await db('tasks').insert(requestBody)
    const nullOrNot = (notesValue) => {
        if (notesValue) {
            return notesValue
        } else {
            return null
        }
    }
    const trueOrFalse = (completedOrNot) => {
        if (completedOrNot) {
            return completedOrNot
        } else {
            return false
        }
    }
    const newTask = {
        task_id: newTaskId[0],
        ...requestBody,
        task_notes: nullOrNot(requestBody.task_notes),
        task_completed: trueOrFalse(requestBody.task_completed)
    }
    return newTask
}

module.exports = {
    getTasks,
    insertTask
}