import Quest from './Quest'
import { useState, useEffect, useContext, useRef } from 'react';
import { SelectedIDsContext } from '../App'
import API from '../scripts/API';

function QuestSelector() {

    const {selectedIDs, setSelectedIDs} = useContext(SelectedIDsContext);
    const [quests, setQuests] = useState([]);
    const [questCardElements, setQuestCardElements] = useState([]);
    const [selectedQuestCard, setSelectedQuestCard] = useState(0);
    const previousQuestLogID = useRef(0);

    const refreshQuestList = async () => {
        const newQuests = selectedIDs.selectedQuestLogID ? await API.get.questsForQuestLog(selectedIDs.selectedQuestLogID) : [];
        setQuests(newQuests);
    };

    const makeAutomatedSelection = () => {
        setSelectedQuestCard(selectedQuestCard > 0 ? selectedQuestCard - 1 : 0);
    }

    const afterQuestDeletion = () => {
        makeAutomatedSelection();
        refreshQuestList();
    }

    const updateSelectedQuest = () => {
        if (quests && quests.length > selectedQuestCard) {
            setSelectedIDs({
                ...selectedIDs,
                selectedQuestID: quests[selectedQuestCard].id
            });
        }
    };
    
    const createNewQuest = async () => {
        await API.create.questForQuestLog(selectedIDs.selectedQuestLogID);
        refreshQuestList();
    }

    const buildQuestCardElements = () => {
        const newQuestCardElements = [];

        if (quests.length != 0) {
            for (const quest in quests) {
                const currentQuest = quests[quest];
                const currentQuestIsSelected = (quest == selectedQuestCard) ? true : false;
    
                newQuestCardElements.push(
                    <Quest key={'Quest_' + currentQuest.id} questID={currentQuest.id}
                    selected={currentQuestIsSelected}
                    onClick={() => {setSelectedQuestCard(quest)}}
                    title={currentQuest.title}
                    afterQuestDeletion={afterQuestDeletion}
                    completed={currentQuest.completed}>
                    </Quest>
                );
            }   
        }

        setQuestCardElements(newQuestCardElements);
    };

    useEffect(() => {
        refreshQuestList();
        if (previousQuestLogID.current != selectedIDs.selectedQuestLogID) {
            makeAutomatedSelection();
            previousQuestLogID.current = selectedIDs.selectedQuestLogID;
        }

    }, [selectedIDs]);

    useEffect(() => {
        updateSelectedQuest();
    }, [selectedQuestCard]);

    useEffect(() => {
        // Make sure there is a selected quest if the last quest in the array is deleted
        if(selectedQuestCard > quests.length - 1) {
            setSelectedQuestCard(0);
        }
        buildQuestCardElements();
        updateSelectedQuest();
    }, [quests, selectedQuestCard]);

    return (
        <div className="QuestSelector Glass">
            {questCardElements}
            <button className="Quest Interactable" onClick={createNewQuest}/>
        </div>
    );
}

export default QuestSelector