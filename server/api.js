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
    if (req.params.user == 0 || req.user.id == req.params.user) {
        return next();
    }
    return res.status(401).send();
});

// Get Routes
api.get('/:user', (req, res, next) => {
    pool.query(`SELECT * FROM quest_logs
                WHERE user_id = ${req.params.user} 
                ORDER BY created_at`)
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/:user/:questLog', (req, res, next) => {
    pool.query(`SELECT * FROM quests 
                WHERE log_id = ${req.params.questLog} 
                ORDER BY created_at
                OFFSET ${parseInt(req.query.start) || 0}
                LIMIT ${parseInt(req.query.limit) || 10}`)
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/:user/:questLog/:quest', (req, res, next) => {
    pool.query(`SELECT * FROM steps 
                WHERE quest_id = ${req.params.quest}
                ORDER BY created_at DESC
                OFFSET ${parseInt(req.query.step) || 0}
                LIMIT 1`)
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/:user/:questLog/:quest/:step', (req, res, next) => {
    pool.query(`SELECT * FROM objectives 
                WHERE step_id = ${req.params.step} 
                ORDER BY created_at`)
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/:user', (req, res) => {
    if (res.locals.result.rows.length == 0) {
        return res.status(404).send();
    }

    return res.status(200).send(res.locals.result.rows);
})

// Post Routes
api.post('/:user', (req, res, next) => {
    pool.query(`INSERT INTO quest_logs
                (id, user_id, title, created_at)
                VALUES 
                (DEFAULT, ${req.params.user}, '${req.body.quest_log_title}', NOW())`)
    .then(() => {next()}).catch(next);
});

api.post('/:user/:questLog', (req, res, next) => {
    pool.query(`INSERT INTO quests
                (id, log_id, title, created_at)
                VALUES 
                (DEFAULT, ${req.params.questLog}, '${req.body.quest_title}', NOW())`)
    .then(() => {next()}).catch(next);
});

api.post('/:user/:questLog/:quest', (req, res, next) => {
    pool.query(`INSERT INTO steps
                (id, quest_id, title, body, created_at)
                VALUES 
                (DEFAULT, ${req.params.quest}, '${req.body.step_title}', '${req.body.step_body}', NOW())`)
    .then(() => {next()}).catch(next);
});

api.post('/:user/:questLog/:quest/:step', (req, res, next) => {
    pool.query(`INSERT INTO objectives
                (id, step_id, statement, complete, created_at)
                VALUES
                (DEFAULT, ${req.params.step}, '${req.body.objective_statement}', ${req.body.objective_complete}, NOW())`)
    .then(() => {next()}).catch(next);
});

api.post('/:user', (req, res) => {
    return res.status(201).send();
});

// Patch Routes
api.patch('/:user/:questLog', (req, res, next) => {
    pool.query(`UPDATE quest_logs
                SET title = '${req.body.quest_log_title}'
                WHERE id = ${req.params.questLog}`)
    .then(() => {next()}).catch(next);
});

api.patch('/:user/:questLog/:quest', (req, res, next) => {
    pool.query(`UPDATE quests
                SET title = '${req.body.quest_title}'
                WHERE id = ${req.params.quest}`)
    .then(() => {next()}).catch(next);
});

api.patch('/:user/:questLog/:quest/:step', (req, res, next) => {
    pool.query(`UPDATE steps
                SET title = '${req.body.step_title}', body = '${req.body.step_body}'
                WHERE id = ${req.params.step}`)
    .then(() => {next()}).catch(next);
});

api.patch('/:user/:questLog/:quest/:step/:objective', (req, res, next) => {
    pool.query(`UPDATE objectives
                SET statement = '${req.body.objective_statement}', complete = ${req.body.objective_complete}
                WHERE id = ${req.params.objective}`)
    .then(() => {next()}).catch(next);
});

api.patch('/:user', (req, res) => {
    return res.status(201).send();
});

// Delete Routes
api.delete('/:user/:questLog', (req, res, next) => {
    pool.query(`DELETE FROM quest_logs
                WHERE id = ${req.params.questLog}`)
    .then(() => {next()}).catch(next);
});

api.delete('/:user/:questLog/:quest', (req, res, next) => {
    pool.query(`DELETE FROM quests
                WHERE id = ${req.params.quest}`)
    .then(() => {next()}).catch(next);
});

api.delete('/:user/:questLog/:quest/:step', (req, res, next) => {
    pool.query(`DELETE FROM steps
                WHERE id = ${req.params.step}`)
    .then(() => {next()}).catch(next);
});

api.delete('/:user/:questLog/:quest/:step/:objective', (req, res, next) => {
    pool.query(`DELETE FROM objectives
                WHERE id = ${req.params.objective}`)
    .then(() => {next()}).catch(next);
});

api.delete('/:user', (req, res) => {
    return res.status(200).send();
});

module.exports = api;