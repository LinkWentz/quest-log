const hostname = 'http://localhost:3000';

const API = {
    get : {
        questLogsForUser : async () => {
            const results = await GET(hostname + `/questLogs`);

            return results;
        },
        questLog : async (questLogID) => {
            const results = await GET(hostname + `/questLog/${questLogID}`);

            return results;
        },
        questsForQuestLog : async (questLogID) => {
            const results = await GET(hostname + `/questsInQuestLog/${questLogID}`);

            return results;
        },
        stepsForQuest : async (questID) => {
            const results = await GET(hostname + `/stepsInQuest/${questID}`);

            return results;
        },
        latestObjectiveForQuest : async (questID) => {
            const results = await GET(hostname + `/latestObjectiveInQuest/${questID}`);

            return results;
        },
        objectivesForStep : async (stepID) => {
            const results = await GET(hostname + `/objectivesInStep/${stepID}`);

            return results;
        }
    },
    create : {
        questLogForUser : async ({ title = '', backgroundImageURL = ''} = {}) => {
            const result = await POST(hostname + `/questLog`, {
                quest_log_title: title,
                quest_log_background_image_url: backgroundImageURL
            });

            return result;
        },
        questForQuestLog : async (questLogID, { title = '', completed = null } = {}) => {
            const result = await POST(hostname + `/questInQuestLog/${questLogID}`, {
                quest_title: title,
                quest_completed: completed
            });

            return result;
        },
        stepForQuest : async (questID, { title = '', body = '' } = {}) => {
            const result = await POST(hostname + `/stepInQuest/${questID}`, {
                step_title: title,
                step_body: body
            });

            return result;
        },
        objectiveForStep : async (stepID, { statement = '', completed = null } = {}) => {
            const result = await POST(hostname + `/objectiveInStep/${stepID}`, {
                objective_statement: statement,
                objective_completed: completed
            });

            return result;
        },
    },
    update : {
        questLog : async (questLogID, { title = undefined, backgroundImageURL = undefined } = {}) => {
            let results = [];

            if (title !== undefined) {
                const result = await PATCH(hostname + `/titleInQuestLog/${questLogID}`, {
                    quest_log_title: title
                });

                results.push(result);
            }

            if (backgroundImageURL !== undefined) {
                const result = await PATCH(hostname + `/backgroundImageURLInQuestLog/${questLogID}`, {
                    quest_log_background_image_url: backgroundImageURL
                });

                results.push(result);
            }

            return results;
        },
        quest : async (questID, { title = undefined, completed = undefined } = {}) => {
            let results = [];

            if (title !== undefined) {
                const result = await PATCH(hostname + `/titleInQuest/${questID}`, {
                    quest_title: title
                });    

                results.push(result);
            }

            if (completed !== undefined) {
                const result = await PATCH(hostname + `/completedInQuest/${questID}`, {
                    quest_completed: completed
                });    

                results.push(result);
            }

            return results;
        },
        step : async (stepID, { title = undefined, body = undefined } = {}) => {
            let results = [];

            if (title !== undefined) {
                const result = await PATCH(hostname + `/titleInStep/${stepID}`, {
                    step_title: title
                });

                results.push(result);
            }

            if (body !== undefined) {
                const result = await PATCH(hostname + `/bodyInStep/${stepID}`, {
                    step_body: body 
                });

                results.push(result);
            }

            return results;
        },
        objective : async (objectiveID, { statement = undefined, completed = undefined } = {}) => {
            let results = [];

            if (statement !== undefined) {
                const result = await PATCH(hostname + `/statementInObjective/${objectiveID}`, {
                    objective_statement: statement
                });

                results.push(result);
            }

            if (completed !== undefined) {
                const result = await PATCH(hostname + `/completedInObjective/${objectiveID}`, {
                    objective_completed: completed
                });

                results.push(result);
            }

            return results;
        }
    },
    delete : {
        questLog : async (questLogID) => {
            const result = await DELETE(hostname + `/questLog/${questLogID}`);

            return result;
        },
        quest : async (questID) => {
            const result = await DELETE(hostname + `/quest/${questID}`);

            return result;
        },
        step : async (stepID) => {
            const result = await DELETE(hostname + `/step/${stepID}`);

            return result;
        },
        objective : async (objectiveID) => {
            const result = await DELETE(hostname + `/objective/${objectiveID}`);

            return result;
        },
    }
}

const GET = async (url) => {
    if (url.includes('null') || url.includes('undefined')) {
        return false;
    }

    let response;

    try {
        response = await fetch(url);
        response = await response.json();

        return await response;
    }
    catch {
        return [];
    }
}

const POST = async (url, body) => {
    if (url.includes('null') || url.includes('undefined')) {
        return false;
    }

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
    if (url.includes('null') || url.includes('undefined')) {
        return false;
    }

    try {
        await fetch(url, {
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
    if (url.includes('null') || url.includes('undefined')) {
        return false;
    }

    try {
        await fetch(url, { method: 'DELETE' });

        return true;
    }
    catch {
        return false;
    }
}

export default API;