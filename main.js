import * as dotenv from "dotenv";
import express from "express";
import { v4 as uuidv4 } from 'uuid';
import * as joi from "joi";

dotenv.config();

const port = process.env.PORT;
const app = express();

// Parsing application/json
app.use(express.json())

// Schema for create envelope validation
const createEnvelopeSchema = joi.object({
	title: joi
		.string()
		.min(3)
		.max(20)
		.required(),
	budget: joi
		.number()
		.integer()
		.required()
});

app.get("/", (req, res) => res.send("Hello, World"));
app.post("/envelopes", (req, res) => {

	res.status(201).json({
		"code": 201,
		"status": "suceess",
		"message": "Envelope has created"
	})
})

app.listen(port, () => console.log(`⚡️[server]: Server is running at https://localhost:${port}`));