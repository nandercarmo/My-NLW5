import express from 'express';

const app = express();

app.get("/", (req, res) => {
	return res.json({
		message: "Olá NLW 05!"
	});
});

app.post("/", (req, res) => {
	return res.json({
		message: "User saved!"
	});
});

app.listen(3333, () => console.log("Server is running on port: 3333"));