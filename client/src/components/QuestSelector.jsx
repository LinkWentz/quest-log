import './styles/QuestSelector.css';
import Quest from './Quest'
import { FileIcon, ListIcon, ExclamationPointIcon, CompassIcon, CheckmarkIcon } from './SVGs';
import { useState, useEffect, useContext } from 'react';
import { SelectedIDsContext } from '../App'
import API from '../scripts/API';

function QuestSelector() {

    const {selectedIDs, setSelectedIDs} = useContext(SelectedIDsContext);

    const [quests, setQuests] = useState([]);
    
    const [questCounts, setQuestCounts] = useState({
        all: 0,
        completed: 0,
        defeated: 0,
        incomplete: 0
    });

    const [questElements, setQuestElements] = useState([]);
    const [selectedQuest, setSelectedQuest] = useState(0);

    // Context Management
    const updateSelectedQuest = () => {
        if (quests && quests.length > selectedQuest) {
            setSelectedIDs({
                ...selectedIDs,
                selectedQuestID: quests[selectedQuest].id
            });
        }
        else {
            setSelectedIDs({
                ...selectedIDs,
                selectedQuestID: null
            });
        }
    };

    // When a new quest is selected
    useEffect(() => {
        updateSelectedQuest();
    }, [selectedQuest]);

    // API interaction
    const refreshQuestList = async () => {
        const newQuests = selectedIDs.selectedQuestLogID ? await API.get.questsForQuestLog(selectedIDs.selectedQuestLogID) : [];

        setQuests(newQuests);
    };
    
    const createNewQuest = async () => {
        await API.create.questForQuestLog(selectedIDs.selectedQuestLogID);
        refreshQuestList();
    }

    // Rendering
    const refreshQuestCounts = () => {
        const newQuestCounts = {
            all: quests.length,
            completed: 0,
            defeated: 0,
            incomplete: 0
        };

        for (const quest in quests) {
            const currentQuest = quests[quest];

            if (currentQuest.completed === null) {
                newQuestCounts.incomplete += 1;
            }
            if (currentQuest.completed === true) {
                newQuestCounts.completed += 1;
            }
            if (currentQuest.completed === false) {
                newQuestCounts.defeated += 1;
            }
        }
        setQuestCounts(newQuestCounts);
    }

    const afterQuestDeletion = (questWasSelected = false) => {
        if (questWasSelected) {
            setSelectedQuest(selectedQuest > 0 ? selectedQuest - 1 : 0);
        }
        refreshQuestList();
    }

    const buildQuestElements = () => {
        const newQuestElements = [];

        if (quests.length != 0) {
            for (const quest in quests) {
                const currentQuest = quests[quest];
                const currentQuestIsSelected = (quest == selectedQuest) ? true : false;

                newQuestElements.push(
                    <Quest key={'Quest_' + currentQuest.id} 
                    questID={currentQuest.id}
                    selected={currentQuestIsSelected}
                    onClick={() => {setSelectedQuest(quest)}}
                    afterQuestDeletion={afterQuestDeletion}
                    title={currentQuest.title}
                    completed={currentQuest.completed}>
                    </Quest>
                );
            }   
        }

        setQuestElements(newQuestElements);
    };

    // When a new quest log is selected
    useEffect(() => {
        refreshQuestList();
        setSelectedQuest(0);
        updateSelectedQuest();
    }, [selectedIDs.selectedQuestLogID]);

    // When a new quest is selected or new quests are recieved
    useEffect(() => {
        refreshQuestCounts();
        buildQuestElements();
        updateSelectedQuest();
    }, [quests, selectedQuest]);

    return (
        <div className="QuestSelector">
            <div className="tabs">
                <div className={`fullQuestListButton statusButton Selected`}>
                        <FileIcon/>
                        <ListIcon/>
                        <span className="questCount">{questCounts.all}</span>
                </div>
                <div className={`incompleteQuestListButton statusButton`}>
                        <FileIcon/>
                        <ExclamationPointIcon/>
                        <span className="questCount">{questCounts.incomplete}</span>
                </div>
                <div className={`defeatedQuestListButton statusButton`}>
                        <FileIcon/>
                        <CompassIcon/>
                        <span className="questCount">{questCounts.defeated}</span>
                </div>
                <div className={`completedQuestListButton statusButton`}>
                        <FileIcon/>
                        <CheckmarkIcon/>
                        <span className="questCount">{questCounts.completed}</span>
                </div>
            </div>
            <div className="questList Background">
                {questElements}
                <button className="Quest Interactable" onClick={createNewQuest}/>
            </div>
        </div>
    );
}

export default QuestSelector