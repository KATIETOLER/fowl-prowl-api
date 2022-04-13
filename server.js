const Joi = require('joi')
const express = require('express')
const app = express()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(express.json())

app.set('port', process.env.PORT || 3000)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}...`))

app.get('/', (request, response) => {
	response.send('Welcome to the bird app!')
})

app.get('/api/v1/allBirds', async (request, response) => {
	try {
		const birds = await database('bird_data').select()
		response.status(200).json(birds)
	} catch (error) {
		response.status(500).json({ error })
	}
})

app.get('/api/v1/allBirds/:id', async (request, response) => {
	try {
		const bird = await database('bird_data')
			.where('id', request.params.id)
			.select()
		if (bird.length) {
			response.status(200).json(bird)
		} else {
			response.status(404).json({
				error: `Could not find bird with id ${request.params.id}`,
			})
		}
	} catch (error) {
		response.status(500).json({ error })
	}
})

app.post('/api/v1/allBirds', (request, response) => {
	const schema = Joi.object({
		family: Joi.string().required(),
		commonName: Joi.string().min(3).required(),
		scientificName: Joi.string().required(),
		description: Joi.string().required(),
		habitat: Joi.string().required(),
		funFact: Joi.string().required(),
		imgURL: Joi.string().required(),
	})

	const newBird = {
		id: allBirds.length + 1,
		family: request.body.family,
		commonName: request.body.commonName,
		scientificName: request.body.scientificName,
		description: request.body.description,
		habitat: request.body.habitat,
		funFact: request.body.funFact,
		imgURL: request.body.imageURL,
	}
	const result = schema.validate(newBird)
	if (result.error) {
		response.status(400).send(result.error.details[0].message)
	}
	allBirds.push(newBird)
	response.send(newBird)
})
