const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./dbConnect");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cartRoutes = require("./routes/cartRoutes");
const authenticate = require("./middleware/authenticate");

app.use(cors({
  origin: "http://localhost:5173",  // Correct the origin here
  credentials: true
}));

require("dotenv").config();

app.use(cookieParser());
// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connectiong the Database
dbConnect();

app.use("/auth", authRoutes);
app.use("/cart",authenticate,cartRoutes)


app.get("/", (req, res) => {
    console.log("APi hit");
  res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


