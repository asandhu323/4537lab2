const express = require('express');
const app = express(); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
const axios = require('axios');

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post('/chatbot', (req, res) => {
	const message = req.body.message;
	const number = message.match(/\d+/);
	if (number) {
		axios.get(`http://numbersapi.com/${number[0]}`).then(response => {
			res.json({
				text: response.data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} else {
		res.json({
			text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
		});
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});