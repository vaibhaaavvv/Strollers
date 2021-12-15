const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/strollers');
}
const port = 80;

const strollersSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    package: String,
    date: String
  });

const contact = mongoose.model('contact', strollersSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded()) // To extract the data from the website to the app.js file

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/bookings', (req, res)=>{
    const params = {}
    res.status(200).render('bookings.pug', params);
})

app.post('/bookings', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('bookings.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});