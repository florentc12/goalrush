const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Import all Routes
const matchsRoutes = require("./routes/matchs");
const betsRoutes = require("./routes/bets");
const usersRoutes = require("./routes/users");
const ticketsRoutes = require("./routes/tickets");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/matchs", matchsRoutes);
app.use("/bets", betsRoutes);
app.use("/users", usersRoutes);
app.use("/tickets", ticketsRoutes);
//app.set("view engine", "pug");
app.set("view engine", "ejs");

// Launching the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`GoalRush is running on port ${port}`);
});
