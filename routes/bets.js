const express = require("express");
const dbConnection = require("../db/mysqlConnector");
const router = express.Router();

// Create a new bet
router.get("/", async function (req, res) {
    try {
        var con = await dbConnection();
        await con.query('SELECT domicile.name as "domicile", exterieur.name as "exterieur", parties.home_team_rating, parties.away_team_rating, parties.draft_rating, parties.date FROM parties inner join teams domicile on parties.home_team = domicile.id inner join teams exterieur on parties.away_team = exterieur.id', (error, results, fields) => {
            con.release();
            res.end(JSON.stringify(results[0]));
        });
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