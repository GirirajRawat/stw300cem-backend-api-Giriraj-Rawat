exports.up = function (knex, Promise) {
    return knex.schema.createTable('teacher', function (table) {
        table.increments('teacherId').primary();
        table.string('firstname').notNullable().unique();
        table.string('lastname').notNullable().unique();
        table.string('mobilenumber').notNullable();
        table.string('address').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('teacher');
}