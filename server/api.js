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
api.get('/:user/questlogs', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM quest_logs
                WHERE user_id = $1
                ORDER BY created_at`,
                values: [req.params.user]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/:user/quests/:questLog', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM quests 
                WHERE log_id = $1 AND user_id = $1
                ORDER BY created_at
                OFFSET $4 LIMIT $5`,
                values: [req.params.questLog, req.params.user]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/:user/steps/:quest', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM steps 
                WHERE quest_id = $1 AND user_id = $2
                ORDER BY created_at DESC
                OFFSET $3 LIMIT 1`,
                values: [req.params.quest, req.params.user]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/:user/objectives/:step', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM objectives 
                WHERE step_id = $1 AND user_id = $2
                ORDER BY created_at`,
                values: [req.params.step, req.params.user]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/:user/*', (req, res) => {
    if (res.locals.result.rows.length == 0) {
        return res.status(404).send();
    }

    return res.status(200).send(res.locals.result.rows);
})

// Post Routes
api.post('/:user/questlog', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO quest_logs
                (id, user_id, title, created_at)
                VALUES 
                (DEFAULT, $1, $2, NOW())`,
                values: [req.params.user, req.body.quest_log_title]})
    .then(() => {next()}).catch(next);
});

api.post('/:user/quest/:questLog', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO quests
                (id, log_id, user_id, title, created_at)
                VALUES 
                (DEFAULT, $1, $2, $3, NOW())`,
                values: [req.params.questLog, req.params.user, req.body.quest_title]})
    .then(() => {next()}).catch(next);
});

api.post('/:user/step/:quest', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO steps
                (id, quest_id, user_id, title, body, created_at)
                VALUES 
                (DEFAULT, $1, $2, $3, $4, NOW())`,
                values: [req.params.quest, req.params.user, req.body.step_title, req.body.step_body]})
    .then(() => {next()}).catch(next);
});

api.post('/:user/objective/:step', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO objectives
                (id, step_id, user_id, statement, complete, created_at)
                VALUES
                (DEFAULT, $1, $2, $3, $4, NOW())`,
                values: [req.params.step, req.params.user, req.body.objective_statement, req.body.objective_complete]})
    .then(() => {next()}).catch(next);
});

api.post('/:user/*', (req, res) => {
    return res.status(201).send();
});

// Patch Routes
api.patch('/:user/questlogs/:questLog', (req, res, next) => {
    pool.query({text: 
               `UPDATE quest_logs
                SET title = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.quest_title, req.params.questLog, req.params.user]})
    .then(() => {next()}).catch(next);
});

api.patch('/:user/quests/:quest', (req, res, next) => {
    pool.query({text: 
               `UPDATE quests 
                SET title = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.quest_title, req.params.quest, req.params.user]})
    .then(() => {next()}).catch(next);
});

api.patch('/:user/steps/:step', (req, res, next) => {
    pool.query({text: 
               `UPDATE steps
                SET title = $1, body = $2
                WHERE id = $3 AND user_id = $4`,
                values: [req.body.step_title, req.body.step_body, req.params.step, req.params.user]})
    .then(() => {next()}).catch(next);
});

api.patch('/:user/objectives/:objective', (req, res, next) => {
    pool.query({text: 
               `UPDATE objectives
                SET statement = $1, complete = $2
                WHERE id = $3 AND user_id = $4`,
                values: [req.body.objective_statement, req.body.objective_complete, req.params.objective, req.params.user]})
    .then(() => {next()}).catch(next);
});

api.patch('/:user/*', (req, res) => {
    return res.status(201).send();
});

// Delete Routes
api.delete('/:user/questlogs/:questLog', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM quest_logs
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.questLog, req.params.user]})
    .then(() => {next()}).catch(next);
});

api.delete('/:user/quests/:quest', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM quests
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.quest, req.params.user]})
    .then(() => {next()}).catch(next);
});

api.delete('/:user/steps/:step', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM steps
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.step, req.params.user]})
    .then(() => {next()}).catch(next);
});

api.delete('/:user/objectives/:objective', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM objectives
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.objective, req.params.user]})
    .then(() => {next()}).catch(next);
});

api.delete('/:user/*', (req, res) => {
    return res.status(200).send();
});

module.exports = api;