const express = require("express");
const dbConnection = require("../db/mysqlConnector");
const router = express.Router();

// GET all tickets
router.get("/", async function (req, res) {
  try {
    var con = await dbConnection();
    await con.query("SELECT * from tickets", (error, results, fields) => {
      con.release();
      //res.end(JSON.stringify(results));
      const ticket = results;

      res.render("tickets", {
        tickets: ticket,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
