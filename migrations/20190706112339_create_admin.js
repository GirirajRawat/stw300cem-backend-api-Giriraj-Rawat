exports.up = function (knex, Promise) {
    return knex.schema.createTable('admin', table =>  {
        table.increments();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('admin');
}