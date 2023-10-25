import Quest from './Quest'
import { useState, useEffect, useContext } from 'react';
import { SelectedIDsContext } from '../App'

function QuestSelector() {

    const ctx = useContext(SelectedIDsContext);
    const [quests, setQuests] = useState([]);
    const [questCardElements, setQuestCardElements] = useState([]);
    const [selectedQuestCard, setSelectedQuestCard] = useState(0);

    const fetchQuestList = async () => {
        if (ctx.selectedIDs.selectedQuestLogID != undefined){
            const newQuests = await (await fetch(`http://localhost:3000/quests/${ctx.selectedIDs.selectedQuestLogID}`)).json();
            await setQuests(newQuests);
        }
    };

    const updateSelectedQuest = () => {
        if (quests && quests.length > selectedQuestCard) {
            ctx.setSelectedIDs({
                ...ctx.selectedIDs,
                selectedQuestID: quests[selectedQuestCard].id
            });
        }
    };

    const buildQuestCardElements = () => {
        const newQuestCardElements = [];

        for (const quest in quests) {
            const currentQuest = quests[quest];
            const currentQuestIsSelected = (quest == selectedQuestCard) ? true : false;

            newQuestCardElements.push(
                <Quest key={'Quest_' + quest}
                selected={currentQuestIsSelected}
                onClick={() => {setSelectedQuestCard(quest)}}
                title={currentQuest.title}>
                </Quest>
            );
        }

        setQuestCardElements(newQuestCardElements);
    };

    useEffect(() => {
        fetchQuestList();
    }, [ctx.selectedIDs]);

    useEffect(() => {
        updateSelectedQuest();
    }, [selectedQuestCard]);

    useEffect(() => {
        buildQuestCardElements();
    }, [quests, selectedQuestCard]);

    return (
        <div className="QuestSelector Glass">
            {questCardElements}
            <button className="Quest Interactable"/>
        </div>
    );
}

export default QuestSelector