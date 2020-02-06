
exports.up = function (knex) {
    return (knex.schema
        .createTable('zoo', tbl => {
            tbl.increments();
            tbl.string('zoo_name', 128).notNullable();
            tbl.string('address', 128).notNullable().unique();
        }))
        .createTable('species', tbl => {
            tbl.increments();
            tbl.string('species_name', 128).notNullable();
        })
        .createTable('animal', tbl => {
            tbl.increments();
            tbl.string('animal_name', 128).notNullable();
            tbl.integer('species_id')
                .notNullable()
                .unsigned()
                .references('species.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('zoo_animal', tbl => {
            tbl.integer('zoo_id')
                .notNullable()
                .unsigned()
                .references('zoo.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('animal_id')
                .notNullable()
                .unsigned()
                .references('animal.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.primary('zoo_id', 'animal_id');
        });
};

exports.down = function (knex) {
    return (knex.schema
        .dropTableIfExists('zoo_animal')
        .dropTableIfExists('animal')
        .dropTableIfExists('species')
        .dropTableIfExists('zoo')
    );
};
