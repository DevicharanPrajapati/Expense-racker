const express = require("express")
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const userRoutes = require("./routes/user.route")


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users", userRoutes);  

app.get("/", (req, res)=>{
  res.send('Hollo world');

})



app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})