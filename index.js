const express = require('express');
const app = express();
const bodyParser=require('body-parser'); 
const cors = require('cors');
// parse application/json 
app.use(bodyParser.json()); 
app.use(cors());

// mongoose
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

// connecting to mongo
const config = require('./config');
async function main() {
    await mongoose.connect(config.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, family: 4});
}


// mongo connection
main()
.then(() => {
   console.log("mongo connection created");
})
.catch(err => {
    console.log("Error while connecting to mongo, ", err);
});


// Routes
const authRoutes = require('./routes/authRoutes');
const tasksRoutes = require('./routes/taskRoutes');

//  middleware
const verifyToken = require('./middleware/verifyToken');

app.use('/auth', authRoutes);
app.use('/tasks',verifyToken, tasksRoutes);


app.listen(8080, function() {
    console.log('Listening on port 8080');
})
