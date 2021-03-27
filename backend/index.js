const express=require('express')
const app =express()
const authRoute=require("./routes/auth")
const postRoute=require("./routes/posts")
const adminRoute=require("./routes/admin")
const userRoute=require("./routes/user")
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser=require('body-parser')
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());
dotenv.config()

app.use(bodyParser.json())


mongoose.connect(process.env.DB_CONNECT ,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>console.log('connected'))
.catch(err=>console.log("error"))

const corsOptions = {
  exposedHeaders: 'auth-token',
};

app.use(cors(corsOptions))
app.use('/api/user',authRoute);
app.use("/api/posts",postRoute)
app.use("/api/admin",adminRoute)
app.use("/api/user",userRoute)


app.listen(3001, ()=>console.log("server started"))