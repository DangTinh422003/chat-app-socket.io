const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// connect database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", usersRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port: http://localhost:${process.env.PORT}`
  );
});
