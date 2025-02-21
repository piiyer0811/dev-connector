const express= require('express');
const connectDB= require('./config/db');


const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// connect database

connectDB();


const PORT= process.env.PORT||3500;


app.get('/', (req,res)=>{

    res.send("<h1>WELCOME TO MY SITE!</h1>");
})


// define routes

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));

// listen for requests
app.listen(PORT, () =>{
    console.log('Server running on port '+PORT);
})