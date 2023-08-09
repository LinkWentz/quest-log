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
    if (req.params.user == 0 || req.user.id == req.params.user){
        return next();
    }
    res.status(401).send();
    return;
});

// Get Routes
api.get('/:user', async (req, res) => {
    try {
        const query = `SELECT * FROM quest_logs
                       WHERE user_id = ${req.params.user} 
                       ORDER BY created_at`;

        let result = await pool.query(query);
        result = result.rows;

        if (!result) {
            throw new Error('No records found!');
        }

        res.status(200).send(result);
    }
    catch {
        res.status(404).send([]);
    }
    return;
});

api.get('/:user/:questLog', async (req, res) => {
    try {
        const query = `SELECT * FROM quests 
                       WHERE log_id = ${req.params.questLog} 
                       ORDER BY created_at
                       OFFSET ${parseInt(req.query.start) || 0}
                       LIMIT ${parseInt(req.query.limit) || 10}`;

        let result = await pool.query(query);
        result = result.rows;

        if (!result) {
            throw new Error('No records found!');
        }

        res.status(200).send(result);
    }
    catch {
        res.status(404).send();
    }
    return;
});

api.get('/:user/:questLog/:quest', async (req, res) => {
    try {
        const query = `SELECT * FROM steps 
                       WHERE quest_id = ${req.params.quest}
                       ORDER BY created_at DESC
                       OFFSET ${parseInt(req.query.step) || 0}
                       LIMIT 1`;

        let result = await pool.query(query);
        result = result.rows;

        if (!result) {
            throw new Error('No records found!');
        }

        res.status(200).send(result);
    }
    catch {
        res.status(404).send([]);
    }
    return;
});

api.get('/:user/:questLog/:quest/:step', async (req, res) => {
    try {
        const query = `SELECT * FROM objectives 
                       WHERE step_id = ${req.params.step} 
                       ORDER BY created_at`
                       
        let result = await pool.query(query);
        result = result.rows;

        if (!result) {
            throw new Error('No records found!');
        }

        res.status(200).send(result);
    }
    catch {
        res.status(404).send([]);
    }
    return;
});

// Post Routes
api.post('/:user', async (req, res) => {
    try {
        const query = `INSERT INTO quest_logs
                       (id, 
                        user_id, 
                        title, 
                        created_at)
                       VALUES 
                       (DEFAULT, 
                        ${req.params.user}, 
                        '${req.body.quest_log_title}', 
                        NOW())`;
        let result = await pool.query(query);

        res.status(201).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

api.post('/:user/:questLog', async (req, res) => {
    try {
        const query = `INSERT INTO quests
                       (id, 
                        log_id, 
                        title, 
                        created_at)
                       VALUES 
                       (DEFAULT, 
                        ${req.params.questLog}, 
                        '${req.body.quest_title}', 
                        NOW())`;
        let result = await pool.query(query);

        res.status(201).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

api.post('/:user/:questLog/:quest', async (req, res) => {
    try {
        const query = `INSERT INTO steps
                       (id, 
                        quest_id,
                        title, 
                        body, 
                        created_at)
                       VALUES 
                       (DEFAULT, 
                        ${req.params.quest},
                        '${req.body.step_title}',
                        '${req.body.step_body}',
                        NOW())`;
        let result = await pool.query(query);

        res.status(201).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

api.post('/:user/:questLog/:quest/:step', async (req, res) => {
    try {
        const query = `INSERT INTO objectives
                       (id, 
                        step_id,
                        statement,
                        complete,
                        created_at)
                       VALUES 
                       (DEFAULT, 
                        ${req.params.step}, 
                        '${req.body.objective_statement}',
                        ${req.body.objective_complete},
                        NOW())`;
        let result = await pool.query(query);

        res.status(201).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// Patch Routes
api.patch('/:user/:questLog', async (req, res) => {
    try {
        const query = `UPDATE quest_logs
                       SET title = '${req.body.quest_log_title}'
                       WHERE id = ${req.params.questLog}`;
        let result = await pool.query(query);

        res.status(201).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

api.patch('/:user/:questLog/:quest', async (req, res) => {
    try {
        const query = `UPDATE quests
                       SET title = '${req.body.quest_title}'
                       WHERE id = ${req.params.quest}`;
        let result = await pool.query(query);

        res.status(201).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

api.patch('/:user/:questLog/:quest/:step', async (req, res) => {
    try {
        const query = `UPDATE steps
                       SET title = '${req.body.step_title}', 
                           body = '${req.body.step_body}'
                       WHERE id = ${req.params.step}`;
        let result = await pool.query(query);

        res.status(201).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

api.patch('/:user/:questLog/:quest/:step/:objective', async (req, res) => {
    try {
        const query = `UPDATE objectives
                       SET statement = '${req.body.objective_statement}', 
                           complete = ${req.body.objective_complete}
                       WHERE id = ${req.params.objective}`;
        let result = await pool.query(query);

        res.status(201).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// Delete Routes
api.delete('/:user/:questLog', async (req, res) => {
    try {
        const query = `DELETE FROM quest_logs
                       WHERE id = ${req.params.questLog}`;
        let result = await pool.query(query);

        res.status(200).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

api.delete('/:user/:questLog/:quest', async (req, res) => {
    try {
        const query = `DELETE FROM quests
                       WHERE id = ${req.params.quest}`;
        let result = await pool.query(query);

        res.status(200).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

api.delete('/:user/:questLog/:quest/:step', async (req, res) => {
    try {
        const query = `DELETE FROM steps
                       WHERE id = ${req.params.step}`;
        let result = await pool.query(query);

        res.status(200).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

api.delete('/:user/:questLog/:quest/:step/:objective', async (req, res) => {
    try {
        const query = `DELETE FROM objectives
                       WHERE id = ${req.params.objective}`;
        let result = await pool.query(query);

        res.status(200).send('Success!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = api;