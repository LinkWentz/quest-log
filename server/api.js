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
});

const queryResponse = async (queryFunction, req, res) => {
    try {
        const result = await queryFunction();

        if (!result) {
            res.status(404);
            res.send([]);
            return;
        }

        res.send(result);
    }
    catch {
        res.status(404);
        res.send([]);
    }
    return;
};

// Quest Logs
api.get('/:user', async (req, res) => {
    queryResponse(async () => {
        let result = await pool.query(`SELECT * FROM quest_logs WHERE user_id = ${req.params.user} ORDER BY created_at`);
        result = result.rows;

        return result;
    }, req, res);
});

api.get('/:user/:questLog', async (req, res) => {
    queryResponse(async () => {
        let result = await pool.query(`SELECT * FROM quests WHERE log_id = ${req.params.questLog} ORDER BY created_at`);
        result = result.rows;

        result = await result.slice(parseInt(req.query.start) || 0, ((parseInt(req.query.start) || 0) + parseInt(req.query.limit)) || -1);

        return result;
    }, req, res);
});

api.get('/:user/:questLog/:quest', async (req, res) => {
    queryResponse(async () => {
        let result = await pool.query(`SELECT * FROM steps WHERE quest_id = ${req.params.quest} AND position_in_quest = ${req.query.step || '(SELECT MAX(position_in_quest) FROM steps)'} ORDER BY position_in_quest LIMIT 1`);
        result = result.rows;

        return result;
    }, req, res);
});

api.get('/:user/:questLog/:quest/:step', async (req, res) => {
    queryResponse(async () => {
        let result = await pool.query(`SELECT * FROM objectives WHERE step_id = ${req.params.step} ORDER BY created_at`);
        result = result.rows;

        return result;
    }, req, res);
})

module.exports = api;