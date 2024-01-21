const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require('./config/keys')

app.use(cors (
  {
     origin: ["https://unite-bharat.vercel.app"],
     methods: ["GET", "POST", "PUT", "DELETE"],
     credentials: true

  }
));
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDb!");
});
mongoose.connection.on("error", (err) => {
  console.log("Error on Connecting MongoDb!", err);
});

require("./models/user");
require("./models/project");
require("./models/pdf");
require("./models/contributor");
require("./models/doubts");
require("./models/contact");
require("./models/event_form");
require("./models/feedback");
require("./models/duplicate");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/projectroute"));
app.use(require("./routes/admin_pdf"));
app.use(require("./routes/profile"));
app.use(require("./routes/contributor"));

app.get("/", (req,res)=>{
  res.json("Welcome to UNITE-BHARAT")
})
app.listen(PORT, () => {
  console.log("Server is running on:", PORT);
});
