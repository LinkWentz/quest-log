import './styles/QuestSelector.css';
import Quest from './Quest'
import { useState, useEffect, useContext } from 'react';
import { SelectedIDsContext } from '../App'
import API from '../scripts/API';

function QuestSelector() {

    const {selectedIDs, setSelectedIDs} = useContext(SelectedIDsContext);

    const [quests, setQuests] = useState([]);

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
    }, [selectedIDs.selectedQuestLogID]);

    // When a new quest is selected or new quests are recieved
    useEffect(() => {
        buildQuestElements();
        updateSelectedQuest();
    }, [quests, selectedQuest]);

    return (
        <div className="QuestSelector Glass">
            {questElements}
            <button className="Quest Interactable" onClick={createNewQuest}/>
        </div>
    );
}

export default QuestSelector