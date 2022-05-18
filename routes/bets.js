const express = require("express");
const dbConnection = require("../db/mysqlConnector");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Create a new bet
router.post("/place/:id/:result", async function (req, res) {
    try {
        var con = await dbConnection();
        let team;
        switch (req.params.result) {
            case "1":
                team = "home_team_rating"
                break;
            case "2":
                team = "draft_rating"
                break;
            case "3":
                team = "away_team_rating"
                break;
          }
    await con.query("INSERT INTO `bets` (party_id, ticket_id, pronostic, potentialGain) VALUES (?, ?, ?, (SELECT " + team + " FROM parties WHERE parties.id = ?))", [req.params.id, uuidv4(), req.params.result, req.params.id], (error, results, fields) => {
        con.release();
            res.status(200).json();
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