require("dotenv").config();
const port = process.env.PORT || 5000;
const domainFrontend = process.env.FRONTEND_LINK;
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
//Middleware
const middlewareLogRequest = require("./Middleware/Logs");
//Routes
const route = require("./Routes/index");
//Run
app.use(
  cors({
    credentials: true,
    origin: domainFrontend,
  })
);
app.use(cookieParser());
app.use(middlewareLogRequest);
app.use(express.json());
//Run Routes
app.use("/", route);

app.listen(port, () => {
  console.log(`Server Berjalan pada port ${port}!`);
  console.log("Frontend", domainFrontend);
});
