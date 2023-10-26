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

api.use('/*', (req, res, next) => {
    if (req.user == undefined) {
        req.user = { id: 0 }
    }
    next();
});

// Get Routes
api.get('/questlogs', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM quest_logs
                WHERE user_id = $1
                ORDER BY created_at`,
                values: [req.user.id]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/questlog/:questLog', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM quest_logs
                WHERE user_id = $1 AND id = $2
                ORDER BY created_at`,
                values: [req.user.id, req.params.questLog]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/quests/:questLog', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM quests 
                WHERE log_id = $1 AND user_id = $2
                ORDER BY created_at`,
                values: [req.params.questLog, req.user.id]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/steps/:quest', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM steps 
                WHERE quest_id = $1 AND user_id = $2
                ORDER BY created_at DESC`,
                values: [req.params.quest, req.user.id]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/latestobjective/:quest', (req, res, next) => {
    pool.query({text: 
                `WITH latest_step (id) AS 
                (SELECT * FROM steps
                WHERE quest_id = 15 AND user_id = 0
                ORDER BY created_at DESC
                LIMIT 1)
                
                SELECT objectives.* FROM objectives, latest_step
                WHERE objectives.step_id = latest_step.id
                AND objectives.user_id = 0
                AND objectives.completed is NULL
                ORDER BY objectives.created_at DESC
                LIMIT 1;`,
                values: [req.params.step, req.user.id]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/objectives/:step', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM objectives 
                WHERE step_id = $1 AND user_id = $2
                ORDER BY created_at`,
                values: [req.params.step, req.user.id]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/*', (req, res) => {
if (res.locals.result == undefined || res.locals.result.rows.length == 0) {
        return res.status(404).send();
    }

    return res.status(200).send(res.locals.result.rows);
})

// Post Routes
api.post('/questlog', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO quest_logs
                (id, user_id, title, background_image_url, created_at)
                VALUES 
                (DEFAULT, $1, $2, $3, NOW())`,
                values: [req.user.id, req.body.quest_log_title, req.body.quest_log_background_image_url]})
    .then(() => {next()}).catch(next);
});

api.post('/quest/:questLog', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO quests
                (id, log_id, user_id, title, completed, created_at)
                VALUES 
                (DEFAULT, $1, $2, $3, $4, NOW())`,
                values: [req.params.questLog, req.user.id, req.body.quest_title, req.body.quest_completed]})
    .then(() => {next()}).catch(next);
});

api.post('/step/:quest', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO steps
                (id, quest_id, user_id, title, body, created_at)
                VALUES 
                (DEFAULT, $1, $2, $3, $4, NOW())`,
                values: [req.params.quest, req.user.id, req.body.step_title, req.body.step_body]})
    .then(() => {next()}).catch(next);
});

api.post('/objective/:step', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO objectives
                (id, step_id, user_id, statement, completed, created_at)
                VALUES
                (DEFAULT, $1, $2, $3, $4, NOW())`,
                values: [req.params.step, req.user.id, req.body.objective_statement, req.body.objective_completed]})
    .then(() => {next()}).catch(next);
});

api.post('/*', (req, res) => {
    return res.status(201).send();
});

// Patch Routes
api.patch('/questlogs/:questLog/backgroundimageurl', (req, res, next) => {
    pool.query({text: 
               `UPDATE quest_logs
                SET background_image_url = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.quest_log_background_image_url, req.params.questLog, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/questlogs/:questLog', (req, res, next) => {
    pool.query({text: 
               `UPDATE quest_logs
                SET title = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.quest_log_title, req.params.questLog, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/quests/:quest', (req, res, next) => {
    pool.query({text: 
               `UPDATE quests 
                SET title = $1, completed = $2
                WHERE id = $3 AND user_id = $4`,
                values: [req.body.quest_title, req.body.quest_completed, req.params.quest, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/steps/:step', (req, res, next) => {
    pool.query({text: 
               `UPDATE steps
                SET title = $1, body = $2
                WHERE id = $3 AND user_id = $4`,
                values: [req.body.step_title, req.body.step_body, req.params.step, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/objectives/:objective', (req, res, next) => {
    pool.query({text: 
               `UPDATE objectives
                SET statement = $1, completed = $2
                WHERE id = $3 AND user_id = $4`,
                values: [req.body.objective_statement, req.body.objective_completed, req.params.objective, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/*', (req, res) => {
    return res.status(201).send();
});

// Delete Routes
api.delete('/questlogs/:questLog', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM quest_logs
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.questLog, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.delete('/quests/:quest', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM quests
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.quest, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.delete('/steps/:step', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM steps
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.step, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.delete('/objectives/:objective', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM objectives
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.objective, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.delete('/*', (req, res) => {
    return res.status(200).send();
});

module.exports = api;