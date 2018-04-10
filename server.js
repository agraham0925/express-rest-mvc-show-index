const express = require('express'); // note syntax for module (no . or /)
const app = express();
const bodyParser = require('body-parser')

// our data
// note the syntax for requiring file -- must start w/ "./"
const fruits = require('./models/fruits.js')



// MIDDLEWARE -- put this above routes/controllers
// you app.use middleware
// include some code to do a thing
// next will continue on to the route
app.use((req, res, next) => {
	console.log("I am middleware and will be run for all routes. Thanks for stopping by!")	
	next();
})
// we are USING the body-parser middleware
// it is a module that will let us see the form data in our POST requests
app.use(bodyParser.urlencoded({extended: false}))



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
	// now that we have body-parser the data is available to us in req.body
	console.log(req.body)	


	// add a a new object to our fruits array
	const newFruit = {
		name: req.body.name,
		color: req.body.color,
		readyToEat: req.body.readyToEat == "on" ? true : false
	}
	// if(req.body.readyToEat == "on") {
	// 	newFruit.readyToEat = true;
	// } else newFruit.readyToEat = false;

	fruits.push(newFruit)
	// you can redirect the user in lieu of res.render or res.send
	res.redirect('/fruits')
})




app.listen(3000, () => {
	console.log("Server listening on port 3000");
})


