exports.up = function(knex) {
    return knex.schema
    .createTable('projects', tbl => {
        tbl.increments('project_id')
        tbl.string('project_name', 255).notNullable()
        tbl.string('project_description', 1000)
        tbl.boolean('project_completed').defaultTo(false)
    })
    .createTable('resources', tbl => {
        tbl.increments('resources_id')
        tbl.string('resource_name',1000).notNullable().unique()
        tbl.string('resource_description', 1000)
    })
    .createTable('tasks', tbl => {
        tbl.increments('task_id')
        tbl.string('task_description')
        tbl.string('task_notes')
        tbl.boolean('task_completed').defaultTo(false)
        tbl.integer('project_id')
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') 
    })
    .createTable('project_resources', tbl => {
        tbl.increments('project_resources_id')
        tbl.integer('resource_id')
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') 
        tbl.integer('project_id')
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') 
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects")
};