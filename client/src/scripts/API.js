const hostname = 'http://localhost:3000';

const API = {
    get : {
        questLogsForUser : async () => {
            const results = await GET(hostname + `/questlogs`);

            return results;
        },
        questLog : async (questLogID) => {
            const results = await GET(hostname + `/questlog/${questLogID}`);

            return results;
        },
        questsForQuestLog : async (questLogID) => {
            const results = await GET(hostname + `/quests/${questLogID}`);

            return results;
        },
        stepsForQuest : async (questID) => {
            const results = await GET(hostname + `/steps/${questID}`);

            return results;
        },
        objectivesForStep : async (stepID) => {
            const results = await GET(hostname + `/objectives/${stepID}`);

            return results;
        },
    },
    create : {
        questLogForUser : async ({ title = '', backgroundImageURL = ''} = {}) => {
            const result = await POST(hostname + `/questlog`, {
                quest_log_title: title,
                quest_log_background_image_url: backgroundImageURL
            });

            return result;
        },
        questForQuestLog : async (questLogID, { title = '', completed = null } = {}) => {
            const result = await POST(hostname + `/quest/${questLogID}`, {
                quest_title: title,
                quest_completed: completed
            });

            return result;
        },
        stepForQuest : async (questID, { title = '', body = '' } = {}) => {
            const result = await POST(hostname + `/step/${questID}`, {
                step_title: title,
                step_body: body
            });

            return result;
        },
        objectiveForStep : async (stepID, { statement = '', completed = null } = {}) => {
            const result = await POST(hostname + `/objective/${stepID}`, {
                objective_statement: statement,
                objective_completed: completed
            });

            return result;
        },
    },
    update : {
        questLogBackgroundImage : async (questLogID, backgroundImageURL = '') => {
            console.log(backgroundImageURL);

            const result = await PATCH(hostname + `/questlogs/${questLogID}/backgroundimageurl`, {
                quest_log_background_image_url: backgroundImageURL
            });

            return result;
        },
        questLogTitle : async (questLogID, title = '') => {
            const result = await PATCH(hostname + `/questlogs/${questLogID}`, {
                quest_log_title: title
            });

            return result;
        },
        quest : async (questID, { title = '', completed = null}) => {
            const result = await PATCH(hostname + `/quests/${questID}`, {
                quest_title: title,
                quest_completed: completed
            });

            return result;
        },
        step : async (stepID, { title = '', body = '' } = {}) => {
            const result = await PATCH(hostname + `/steps/${stepID}`, {
                step_title: title,
                step_body: body 
            });

            return result;
        },
        objective : async (objectiveID, { statement = '', completed = null } = {}) => {
            const result = await PATCH(hostname + `/objectives/${objectiveID}`, {
                objective_statement: statement,
                objective_completed: completed 
            });

            return result;
        }
    },
    delete : {
        questLog : async (questLogID) => {
            const result = await DELETE(hostname + `/questlogs/${questLogID}`);

            return result;
        },
        quest : async (questID) => {
            const result = await DELETE(hostname + `/quests/${questID}`);

            return result;
        },
        step : async (stepID) => {
            const result = await DELETE(hostname + `/steps/${stepID}`);

            return result;
        },
        objective : async (objectiveID) => {
            const result = await DELETE(hostname + `/objectives/${objectiveID}`);

            return result;
        },
    }
}

const GET = async (url) => {
    let response;

    try {
        response = await fetch(url);
        response = response.json();

        return await response;
    }
    catch {
        return [];
    }
}

const POST = async (url, body) => {
    try{
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        return true;
    }
    catch {
        return false;
    }
}

const PATCH = async (url, body) => {
    try {
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        return true;
    }
    catch {
        return false;
    }
}

const DELETE = async (url) => {
    try {
        await fetch(url, { method: 'DELETE' });

        return true;
    }
    catch {
        return false;
    }
}

export default API;