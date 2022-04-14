// Update with your config settings.
module.exports = {
	development: {
		client: 'pg',
		connection: 'postgres://localhost/bird_data',
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds/dev',
		},
		useNullAsDefault: true,
	},

	production: {
  client: 'pg',
  connection: process.env.DATABASE_URL + `?ssl=true`,
  migrations: {
    directory: './db/migrations'
  },
  useNullAsDefault: true
},
}
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
