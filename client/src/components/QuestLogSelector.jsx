import './styles/QuestLogSelector.css'
import QuestLog from './QuestLog'
import { useState, useEffect, useContext } from 'react';
import { SelectedIDsContext } from '../App'

function QuestLogSelector() {

    const ctx = useContext(SelectedIDsContext);
    const [questLogs, setQuestLogs] = useState([]);
    const [questLogElements, setQuestLogElements] = useState([]);
    const [selectedQuestLog, setSelectedQuestLog] = useState(0);

    const fetchQuestLogList = async () => {
        try {
            const newQuestLogs = await (await fetch(`http://localhost:3000/questlogs`)).json(); 
            if (newQuestLogs == questLogs) {
                return false;
            }
            await setQuestLogs(newQuestLogs);
            return true;
        }
        catch {
            return false;
        }
    };

    const afterQuestLogDeletion = () => {
        setSelectedQuestLog(selectedQuestLog > 0 ? selectedQuestLog - 1 : 0);
        fetchQuestLogList();
    }

    const buildQuestLogElements = () => {
        const newQuestLogElements = [];

        for (const questLog in questLogs) {
            const currentQuestLog = questLogs[questLog];
            const currentQuestLogIsSelected = (questLog == selectedQuestLog) ? true : false;

            newQuestLogElements.push(
                <QuestLog key={'Quest_Log_' + questLog} questLogID={currentQuestLog.id}
                selected={currentQuestLogIsSelected}
                afterQuestLogDeletion={afterQuestLogDeletion}
                onClick={() => {setSelectedQuestLog(questLog)}}>
                    {currentQuestLog.title}
                </QuestLog>
                );
            }
        setQuestLogElements(newQuestLogElements);
    };

    const updateSelectedQuestLog = () => {
        if (questLogs && questLogs.length > selectedQuestLog) {
            ctx.setSelectedIDs({
                ...ctx.selectedIDs,
                selectedQuestLogID: questLogs[selectedQuestLog].id
            });
        }
    };

    const createNewQuestLog = async () => {
        await fetch(`http://localhost:3000/questlog/`, {
            method: 'POST',
            body: JSON.stringify({
                quest_log_title: 'Default Title'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        fetchQuestLogList();
    }

    useEffect(() => {
        fetchQuestLogList();
    }, []);

    useEffect(() => {
        updateSelectedQuestLog();
    }, [selectedQuestLog]);

    useEffect(() => {
        buildQuestLogElements();
        updateSelectedQuestLog();
    }, [selectedQuestLog, questLogs]);

    return (
        <div className="QuestLogSelector Glass">
            {questLogElements}
            <div className="newQuestLog Interactable" onClick={createNewQuestLog}/>
        </div>
    );
}

export default QuestLogSelector
