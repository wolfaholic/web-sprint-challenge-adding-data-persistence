// build your `Resource` model here
const db = require('../../data/dbConfig')

async function getResources() {
    const resources = await db('resources')



    return resources
}

async function insertResource(requestBody) {
    const newResourceId = await db('resources').insert(requestBody)
    const nullOrNot = (descValue) => {
        if (descValue) {
            return descValue
        } else {
            return null
        }
    }
    const newResource = {
        resource_id: newResourceId[0],
        ...requestBody,
        resource_description: nullOrNot(requestBody.resource_description)
    }
    return newResource
}
0
module.exports = {
    insertResource,
    getResources
}