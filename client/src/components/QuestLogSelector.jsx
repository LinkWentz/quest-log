import './styles/QuestLogSelector.css'
import QuestLog from './QuestLog'
import { useState, useEffect, useContext } from 'react';
import { SelectedIDsContext } from '../App'
import API from '../scripts/API';

function QuestLogSelector() {

    const ctx = useContext(SelectedIDsContext);
    const [questLogs, setQuestLogs] = useState([]);
    const [questLogElements, setQuestLogElements] = useState([]);
    const [selectedQuestLog, setSelectedQuestLog] = useState(0);

    const refreshQuestLogList = async () => {
        const newQuestLogs = await API.get.questLogsForUser();
        setQuestLogs(newQuestLogs);
    };

    const afterQuestLogDeletion = () => {
        setSelectedQuestLog(selectedQuestLog > 0 ? selectedQuestLog - 1 : 0);
        refreshQuestLogList();
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
        await API.create.questLogForUser({ title: 'Default Title', backgroundImageURL: ''});
        refreshQuestLogList();
    }

    useEffect(() => {
        refreshQuestLogList();
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
