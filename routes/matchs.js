const express = require("express");
const dbConnection = require("../db/mysqlConnector");
const router = express.Router();

// GET all matchs
router.get("/", async function (req, res) {
  try {
    var con = await dbConnection();
    await con.query(
      'SELECT parties.id as id, domicile.name as "domicile", exterieur.name as "exterieur", parties.home_team_rating, parties.away_team_rating, parties.draft_rating, DATE_FORMAT(parties.date,"%d/%m/%Y") as date FROM parties inner join teams domicile on parties.home_team = domicile.id inner join teams exterieur on parties.away_team = exterieur.id',
      (error, results, fields) => {
        con.release();
        //res.end(JSON.stringify(results));
        const match = results;

        res.render("matchs", {
          matchs: match,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// UPDATE currentTry from one user
/*router.post("/updateCurrentTry", async function (req, res) {
    try {
        var con = await dbConnection();
        await con.query('UPDATE `rank` SET currentTry = ? WHERE userName = ?', [req.body.updatedTry, req.body.userName])
        con.release();
        res.status(200).json();
    } catch (error) {
        console.log(error);
    }
});*/

module.exports = router;
