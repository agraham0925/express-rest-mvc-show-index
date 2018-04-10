const express = require('express'); // note syntax for module (no . or /)
const app = express();

// our data
// note the syntax for requiring file -- must start w/ "./"
const fruits = require('./models/fruits.js')


/// these are all our ROUTES


// ****index*** route - this will list all the fruits
app.get('/fruits', (req, res) => {

	// res.send(fruits);
	res.render('index.ejs', {
		theFruits: fruits, // <--data
		pageTitle: "FRUITS INDEX"
	})

})

// ** new route **
// this route will show a template for the user to add fruits
// we put it here to avoid /fruits/:id hijacking it
app.get('/fruits/new', (req, res) => {
	res.render('new.ejs')	 // we are rendering a template
})

// ** show ** route -- show all info about one particular fruit
app.get('/fruits/:id', (req, res) => {
	// const index = req.params.id
	// res.send(fruits[index])

	// you "Render" templates where you previously just "send"ed data
	// the data you want to display in your template is the second parameter
	// your data will ***ALWAYS*** be an object. 
	// advice: use singular for show page
	res.render('show.ejs', {
		fruit: fruits[req.params.id],
		message: "HI I AM A MESSAGE",
		secretMessageObject: {
			secret: "this is a secret"
		}
	})

})

app.post('/fruits', (req, res) => {
	console.log(req)
	res.send("you hit the post route");
})




app.listen(3000, () => {
	console.log("Server listening on port 3000");
})


