import './styles/QuestLogSelector.css'
import Tab from './Tab'
import { useState, useEffect, useContext } from 'react';
import { SelectedIDsContext } from '../App'

function QuestLogSelector() {
    
    const ctx = useContext(SelectedIDsContext);
    const [questLogs, setQuestLogs] = useState([]);
    const [questLogElements, setQuestLogElements] = useState([]);
    const [selectedQuestLog, setSelectedQuestLog] = useState(0);

    const fetchQuestLogList = async () => {
        const newQuestLogs = await (await fetch(`http://localhost:3000/questlogs`)).json();
        await setQuestLogs(newQuestLogs);
    };

    const updateSelectedQuestLog = () => {
        if (questLogs && questLogs.length > selectedQuestLog) {
            ctx.setSelectedIDs({
                ...ctx.selectedIDs,
                selectedQuestLogID: questLogs[selectedQuestLog].id
            });
        }
    };

    const buildQuestLogElements = () => {
        const newQuestLogElements = [];

        for (const questLog in questLogs) {
            const currentQuestLog = questLogs[questLog];
            const currentQuestLogIsSelected = (questLog == selectedQuestLog) ? true : false;

            newQuestLogElements.push(
                <Tab key={'Quest_Log_' + questLog} questLogID={currentQuestLog.id}
                selected={currentQuestLogIsSelected}
                onClick={() => {setSelectedQuestLog(questLog)}}>
                    {currentQuestLog.title}
                </Tab>
                );
            }
        setQuestLogElements(newQuestLogElements);
    };

    useEffect(() => {
        fetchQuestLogList();
    }, []);

    useEffect(() => {
        updateSelectedQuestLog();
    }, [selectedQuestLog]);

    useEffect(() => {
        buildQuestLogElements();
    }, [selectedQuestLog, questLogs]);

    return (
        <div className="QuestLogSelector Glass">
            {questLogElements}
            <div className="newQuestLog Interactable"/>
        </div>
    );
}

export default QuestLogSelector
