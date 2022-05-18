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

// GET tickets status
router.get("/isWon/:id", async function (req, res) {
  try {
    var con = await dbConnection();
    await con.query("SELECT * FROM tickets WHERE id = ?", [req.params.id], (error, results, fields) => {
      con.release();
      let isWon = true
      let finished = true

      for (const data of results) { 
        switch (data.result) {
          case "0":
            isWon = false
            break;
          case null:
            finished = false
            break;
        }
      }

      if (!finished) { isWon = false }

      res.end(JSON.stringify({"isWon": isWon, 
                              "finished": finished}
                            ));
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
