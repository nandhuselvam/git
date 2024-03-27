const mentorRouter = require('./Routers/MentorRouter')
const studentRouter = require('./Routers/StudentRouter')
require('dotenv').config();
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());  /* To avoid cross origin error */

app.use(express.json());  

const PORT = process.env.PORT || 4200;
const URL = process.env.MONGODB_URL;

const mongoose = require('mongoose');

// Define your schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Create model
const User = mongoose.model('User', userSchema);

// Call createIndexes() method on the model to ensure indexes are created
User.createIndexes()
  .then(() => {
    console.log('Indexes created successfully');
  })
  .catch(err => {
    console.error('Error creating indexes:', err);
  });



const uri = 'mongodb://localhost:27017/your_database_name';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });



app.get('/',(req,res) => res.send(`
<div>
<p> In Home Page </p>
<p>To get all mentor List - https://zen-assign-mentors.herokuapp.com/Mentors </p>
<br>
<p>To get all Students List - https://zen-assign-mentors.herokuapp.com/Students </p>
<br>
<p>To get mentor based on ID - https://zen-assign-mentors.herokuapp.com/Mentors/get-mentor/:id<p>
<p>sample - https://zen-assign-mentors.herokuapp.com/Mentors/get-mentor/60e7f515d5ff5342a06652e3 </p>

<p> To test Post and update - visit Frontend page of the application - https://preethi-st.github.io/ZEN-Mentors-Frontend/ </p>
</div>
`))

app.use('/Mentors',mentorRouter);
app.use('/Students',studentRouter);

app.listen(PORT, () => 
console.log(`Server started in the port ${PORT}`));


