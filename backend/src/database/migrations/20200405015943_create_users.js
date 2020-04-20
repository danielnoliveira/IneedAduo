
exports.up = async function(knex) {
  await knex.schema.createTable('users',function(table){
    table.string('id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('password').notNullable();
    table.string('role').notNullable();
    table.string('puuid').notNullable();
    table.string('accountId').notNullable();
    table.string('summonerLevel').notNullable();
    table.string('tier_solo').notNullable();
    table.string('rank_solo').notNullable();
    table.string('tier_flex').notNullable();
    table.string('rank_flex').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('users');
};
