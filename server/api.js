require('dotenv').config();

// Packages
const express = require('express');
const pg = require('pg');

/*---- Config -----*/
// Router Setup
const api = express.Router();

// Database Access Setup
const pool = new pg.Pool({
    user: process.env['PGUSER'],
    host: process.env['PGHOST'],
    database: process.env['PGDATABASE'],
    password: process.env['PGPASSWORD'],
    port: process.env['PGPORT']
});

/*---- Routes -----*/
// Middleware
api.use('/:user', (req, res, next) => {
    if (req.user.id != req.params.user && req.params.user != 0){
        res.status(401);
        res.send('Request Not Authorized');
        return;
    }
    next();
})

// Quest Logs
api.get('/:user', async (req, res) => {
    try {
        const users_quests_logs = await pool.query(`SELECT * FROM quest_logs WHERE user_id = ${req.params.user}`);
        
        if (users_quests_logs.rows.length == 0) {
            res.status(404);
            res.send([]);
            return;
        }

        res.send(users_quests_logs.rows);
    }
    catch {
        res.status(404);
        res.send([]);
    }
    return;
});

module.exports = api;