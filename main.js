import * as dotenv from "dotenv";
import express from "express";
import { v4 as uuidv4 } from 'uuid';
import Joi from "joi";
import { validate } from "./middlewares/joi-validation-middleware.js"

dotenv.config();

const port = process.env.PORT;
const app = express();

// Parsing application/json
app.use(express.json())

// Schema for create envelope validation
const createEnvelopeSchema = Joi.object({
	title: Joi
		.string()
		.min(3)
		.max(20)
		.required(),
	budget: Joi
		.number()
		.integer()
		.required()
});

// Initialization Envelopes global var
global.envelopes = [];

// Routes
app.get("/", (req, res) => res.send("Hello, World"));
app.post("/envelopes", validate(createEnvelopeSchema), (req, res) => {
	const { title, budget } = req.body;
	const data = {
		id: uuidv4(),
		title,
		budget
	};

	global.envelopes.push({
		id: data.id,
		title: data.title,
		budget: data.budget
	});

	res
		.status(201)
		.json({
			"suceess": true,
			"message": "Envelope has created",
			data
		});
});
app.get("/envelopes", (req, res) => {
	const data = global.envelopes;

	res
		.status(200)
		.json({
			"suceess": true,
			"message": "Success to getting all envelopes",
			data
		})
})
app.get("/envelopes/:id", (req, res) => {
	const { id } = req.params;
	const data = global.envelopes.find(elem => elem.id === id);

	res
		.status(200)
		.json({
			"suceess": true,
			"message": "Success to getting an envelope",
			data
		})
})
app.patch("/envelopes/:id", (req, res) => {
	const { id } = req.params;
	const { title, budget } = req.body;

	const envelopeIndex = global.envelopes.findIndex(elem => elem.id === id);

	if (Boolean(title)) {
		global.envelopes[envelopeIndex].title = title;
	} else if (Boolean(budget)) {
		global.envelopes[envelopeIndex].budget = budget;
	}

	const data = global.envelopes.find(elem => elem.id === id);

	res
		.status(206)
		.json({
			"suceess": true,
			"message": "Success updated an envelope",
			data
		})
});

app.listen(port, () => console.log(`⚡️[server]: Server is running at https://localhost:${port}`));