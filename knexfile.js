// Update with your config settings.
module.exports = {
	development: {
		client: 'pg',
		connection: 'postgres://localhost/bird_data',
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
		useNullAsDefault: true,
	},

	production: {
	    client: 'postgresql',
	    connection: {
	        connectionString: process.env.DATABASE_URL,
	        ssl: { rejectUnauthorized: false }
	    },
			migrations: {
				directory: './db/migrations',
			},
			seeds: {
				directory: './db/seeds',
			},
			useNullAsDefault: true,
	}
}
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
