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

// Global variable
global.id;
global.title;
global.budget;

// Routes
app.get("/", (req, res) => res.send("Hello, World"));
app.post("/envelopes", validate(createEnvelopeSchema), (req, res) => {
	const { title, budget } = req.body;
	const data = {
		id: uuidv4(),
		title,
		budget
	}

	res
		.status(201)
		.json({
			"suceess": true,
			"message": "Envelope has created",
			data
		})
});
app.get("/envelopes", (req, res) => {
	const data = {
		id,
		title,
		budget
	}

	res
		.status(200)
		.json({
			"suceess": true,
			"message": "Success to getting envelopes",
			data
		})
})

app.listen(port, () => console.log(`⚡️[server]: Server is running at https://localhost:${port}`));