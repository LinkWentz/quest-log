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
api.get('/questLogs', (req, res, next) => {
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

api.get('/questLog/:questLogID', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM quest_logs
                WHERE user_id = $1 AND id = $2
                ORDER BY created_at`,
                values: [req.user.id, req.params.questLogID]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/questsInQuestLog/:questLogID', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM quests 
                WHERE log_id = $1 AND user_id = $2
                ORDER BY created_at`,
                values: [req.params.questLogID, req.user.id]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/stepsInQuest/:questID', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM steps 
                WHERE quest_id = $1 AND user_id = $2
                ORDER BY created_at DESC`,
                values: [req.params.questID, req.user.id]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/latestObjectiveInQuest/:questID', (req, res, next) => {
    pool.query({text: 
                `WITH latest_step (id) AS 
                (SELECT * FROM steps
                WHERE quest_id = $1 AND user_id = $2
                ORDER BY created_at DESC
                LIMIT 1)
                
                SELECT objectives.* FROM objectives, latest_step
                WHERE objectives.step_id = latest_step.id
                AND objectives.user_id = $2
                AND objectives.completed is NULL
                ORDER BY objectives.created_at DESC
                LIMIT 1;`,
                values: [req.params.questID, req.user.id]})
    .then((result) => {
        res.locals.result = result;
        next();
    })
    .catch(next);
});

api.get('/objectivesInStep/:stepID', (req, res, next) => {
    pool.query({text: 
               `SELECT * FROM objectives 
                WHERE step_id = $1 AND user_id = $2
                ORDER BY created_at`,
                values: [req.params.stepID, req.user.id]})
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
api.post('/questLog', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO quest_logs
                (id, user_id, title, background_image_url, created_at)
                VALUES 
                (DEFAULT, $1, $2, $3, NOW())`,
                values: [req.user.id, req.body.quest_log_title, req.body.quest_log_background_image_url]})
    .then(() => {next()}).catch(next);
});

api.post('/questInQuestLog/:questLogID', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO quests
                (id, log_id, user_id, title, completed, created_at)
                VALUES 
                (DEFAULT, $1, $2, $3, $4, NOW())`,
                values: [req.params.questLogID, req.user.id, req.body.quest_title, req.body.quest_completed]})
    .then(() => {next()}).catch(next);
});

api.post('/stepInQuest/:questID', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO steps
                (id, quest_id, user_id, title, body, created_at)
                VALUES 
                (DEFAULT, $1, $2, $3, $4, NOW())`,
                values: [req.params.questID, req.user.id, req.body.step_title, req.body.step_body]})
    .then(() => {next()}).catch(next);
});

api.post('/objectiveInStep/:stepID', (req, res, next) => {
    pool.query({text: 
               `INSERT INTO objectives
                (id, step_id, user_id, statement, completed, created_at)
                VALUES
                (DEFAULT, $1, $2, $3, $4, NOW())`,
                values: [req.params.stepID, req.user.id, req.body.objective_statement, req.body.objective_completed]})
    .then(() => {next()}).catch(next);
});

api.post('/*', (req, res) => {
    return res.status(201).send();
});

// Patch Routes
api.patch('/backgroundImageURLInQuestLog/:questLogID/', (req, res, next) => {
    pool.query({text: 
               `UPDATE quest_logs
                SET background_image_url = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.quest_log_background_image_url, req.params.questLogID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/titleInQuestLog/:questLogID', (req, res, next) => {
    pool.query({text: 
               `UPDATE quest_logs
                SET title = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.quest_log_title, req.params.questLogID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/titleInQuest/:questID', (req, res, next) => {
    pool.query({text: 
               `UPDATE quests 
                SET title = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.quest_title, req.params.questID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/completedInQuest/:questID', (req, res, next) => {
    pool.query({text: 
               `UPDATE quests 
                SET completed = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.quest_completed, req.params.questID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/titleInStep/:stepID', (req, res, next) => {
    pool.query({text: 
               `UPDATE steps
                SET title = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.step_title, req.params.stepID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/bodyInStep/:stepID', (req, res, next) => {
    pool.query({text: 
               `UPDATE steps
                SET body = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.step_body, req.params.stepID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/statementInObjective/:objectiveID', (req, res, next) => {
    pool.query({text: 
               `UPDATE objectives
                SET statement = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.objective_statement, req.params.objectiveID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/completedInObjective/:objectiveID', (req, res, next) => {
    pool.query({text: 
               `UPDATE objectives
                SET completed = $1
                WHERE id = $2 AND user_id = $3`,
                values: [req.body.objective_completed, req.params.objectiveID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.patch('/*', (req, res) => {
    return res.status(201).send();
});

// Delete Routes
api.delete('/questLog/:questLogID', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM quest_logs
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.questLogID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.delete('/quest/:questID', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM quests
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.questID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.delete('/step/:stepID', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM steps
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.stepID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.delete('/objective/:objectiveID', (req, res, next) => {
    pool.query({text: 
               `DELETE FROM objectives
                WHERE id = $1 AND user_id = $2`,
                values: [req.params.objectiveID, req.user.id]})
    .then(() => {next()}).catch(next);
});

api.delete('/*', (req, res) => {
    return res.status(200).send();
});

module.exports = api;