import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.PORT;
const app = express();

// Parsing application/json
app.use(express.json())

app.get("/", (req, res) => res.send("Hello, World"));
app.post("/envelopes", (req, res) => {

	res.status(201).json({
		"code": 201,
		"status": "suceess",
		"message": "Envelope has created"
	})
})

app.listen(port, () => console.log(`⚡️[server]: Server is running at https://localhost:${port}`));