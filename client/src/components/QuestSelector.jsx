import Quest from './Quest'
import { useState, useEffect, useContext } from 'react';
import { SelectedIDsContext } from '../App'

function QuestSelector() {

    const {selectedIDs, setSelectedIDs} = useContext(SelectedIDsContext);
    const [quests, setQuests] = useState([]);
    const [questCardElements, setQuestCardElements] = useState([]);
    const [selectedQuestCard, setSelectedQuestCard] = useState(0);

    const fetchQuestList = async () => {
        if (selectedIDs.selectedQuestLogID != undefined){
            const newQuests = await (await fetch(`http://localhost:3000/quests/${selectedIDs.selectedQuestLogID}`)).json();
            await setQuests(newQuests);
        }
    };

    const updateSelectedQuest = () => {
        if (quests && quests.length > selectedQuestCard) {
            setSelectedIDs({
                ...selectedIDs,
                selectedQuestID: quests[selectedQuestCard].id
            });
        }
    };
    
    const createNewQuest = async () => {
        await fetch(`http://localhost:3000/quest/${selectedIDs.selectedQuestLogID}`, {
            method: 'POST',
            body: JSON.stringify({
                quest_title: 'Default Title'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        fetchQuestList();
    }

    const buildQuestCardElements = () => {
        const newQuestCardElements = [];

        for (const quest in quests) {
            const currentQuest = quests[quest];
            const currentQuestIsSelected = (quest == selectedQuestCard) ? true : false;

            newQuestCardElements.push(
                <Quest key={'Quest_' + currentQuest.id} questID={currentQuest.id}
                selected={currentQuestIsSelected}
                onClick={() => {setSelectedQuestCard(quest)}}
                title={currentQuest.title}
                fetchQuestList={() => {fetchQuestList()}}
                completed={currentQuest.completed}>
                </Quest>
            );
        }

        setQuestCardElements(newQuestCardElements);
    };

    useEffect(() => {
        fetchQuestList();
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