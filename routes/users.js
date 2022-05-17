const express = require("express");
const dbConnection = require("../db/mysqlConnector");
const router = express.Router();

// GET currentTry from one user
router.get("/tickets/:result", async function (req, res) {
    try {
        var con = await dbConnection();
        await con.query('SELECT * FROM `tickets` WHERE result = ?', [req.params.result], (error, results, fields) => {
            con.release();
            res.end((results[0].bet).toString());
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