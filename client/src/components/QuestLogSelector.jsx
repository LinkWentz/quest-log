import './styles/QuestLogSelector.css'
import QuestLog from './QuestLog'
import { useState, useEffect, useContext } from 'react';
import { SelectedIDsContext } from '../App'
import { DeleteButton } from './StatusButtons';
import API from '../scripts/API';

function QuestLogSelector() {

    const {selectedIDs, setSelectedIDs} = useContext(SelectedIDsContext);

    const [questLogs, setQuestLogs] = useState([]);

    const [questLogElements, setQuestLogElements] = useState([]);
    const [selectedQuestLog, setSelectedQuestLog] = useState(0);

    // Context management
    const updateSelectedQuestLog = () => {
        if (questLogs && questLogs.length > selectedQuestLog) {
            setSelectedIDs({
                ...selectedIDs,
                selectedQuestLogID: questLogs[selectedQuestLog].id
            });
        }
        else {
            setSelectedIDs({
                ...selectedIDs,
                selectedQuestLogID: null
            });
        }
    };

    // When a new quest log is selected
    useEffect(() => {
        updateSelectedQuestLog();
    }, [selectedQuestLog]);

    // API interaction
    const refreshQuestLogList = async () => {
        const newQuestLogs = await API.get.questLogsForUser();
        setQuestLogs(newQuestLogs);
    };

    const createNewQuestLog = async () => {
        await API.create.questLogForUser({ title: '', backgroundImageURL: ''});
        refreshQuestLogList();
    }

    useEffect(() => {
        refreshQuestLogList();
    }, []);

    // Rendering
    const afterQuestLogDeletion = () => {
        setSelectedQuestLog(selectedQuestLog > 0 ? selectedQuestLog - 1 : 0);
        refreshQuestLogList();
    }

    const buildQuestLogElements = () => {
        const newQuestLogElements = [];

        if (questLogs.length != 0) {
            for (const questLog in questLogs) {
                const currentQuestLog = questLogs[questLog];
                const currentQuestLogIsSelected = (questLog == selectedQuestLog) ? true : false;
    
                newQuestLogElements.push(
                    <QuestLog key={'Quest_Log_' + currentQuestLog.id} 
                    questLogID={currentQuestLog.id}
                    selected={currentQuestLogIsSelected}
                    afterQuestLogDeletion={afterQuestLogDeletion}
                    onClick={() => {setSelectedQuestLog(questLog)}}>
                        {currentQuestLog.title}
                    </QuestLog>
                );
            }
        }

        setQuestLogElements(newQuestLogElements);
    };

    // When a new quest log is selected or new quest logs are recieved
    useEffect(() => {
        buildQuestLogElements();
        updateSelectedQuestLog();
    }, [selectedQuestLog, questLogs]);

    return (
         <div className="QuestLogSelector Background">
            {questLogElements}
            <div className="newQuestLog Interactable" onClick={createNewQuestLog}/>
        </div>
    );
}

export default QuestLogSelector
