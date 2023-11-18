import EditableText from './EditableText';
import { CutCornerCard } from './SVGs';
import { useState, useEffect } from 'react';
import { CompleteButton, DefeatButton, DeleteButton } from './StatusButtons';
import API from '../scripts/API';

function Quest(props) {

    const [content, setContent] = useState({
        title: props.title,
        completed: props.completed != undefined ? props.completed : null
    });

    const [latestObjective, setLatestObjective] = useState('No Unresolved Objectives In Latest Step');

    const updateQuestData = ({ title, completed }) => {
        API.update.quest(props.questID, { title, completed });
    }

    const deleteQuest = async () => {
        await API.delete.quest(props.questID);
        props.afterQuestDeletion(props.selected);
    }

    const loadLatestQuestObjective = async () => {
        const latestObjectives = (await API.get.latestObjectiveForQuest(props.questID));

        if (latestObjectives.length == 0) {
            return;
        }

        const latestObjective = latestObjectives[0];

        if (latestObjective.statement != undefined && latestObjective.statement != '') {
            setLatestObjective(latestObjective.statement);
        }
    }

    useEffect(() => {
        loadLatestQuestObjective();
    }, []);

    useEffect(() => {
        updateQuestData(content);
    }, [content])

    return (
        <div className={
            `Quest Interactable 
            ${props.selected ? 'Selected' : ''} 
            ${content.completed == true ? 'Complete' : ''} 
            ${content.completed == false ? 'Defeat' : ''}`}
        onClick={props.onClick}>
            <CutCornerCard />
            <header>
                <EditableText placeholder='Quest Title' onContentChange={(newText) => {setContent({ ...content, title: newText})}} selected={props.selected} onlyEditableIfSelected>
                    {props.title}
                </EditableText>
            </header>
            <footer>{latestObjective}</footer>
            <CompleteButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DefeatButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DeleteButton delete={deleteQuest} selected={props.selected} onlyClickableIfSelected/>
        </div>
    );
}

export default Quest