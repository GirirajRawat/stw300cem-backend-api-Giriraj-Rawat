
exports.up = function (knex, Promise) {
    return knex.schema.createTable('student', function (table) {
        table.increments('studentID');
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('mobilenumber').notNullable();
        table.string('address').notNullable();
        table.string('faculty').notNullable();
        table.string('batch').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('student');
};
