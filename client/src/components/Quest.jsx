import EditableText from './EditableText';
import { useState, useEffect } from 'react';
import API from '../scripts/API';
import { CompleteButton, DefeatButton, DeleteButton } from './StatusButtons';

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
            <svg preserveAspectRatio='none' viewBox="0 0 200 23" vector-effect="non-scaling-stroke">
                <g id="layer1" transform="translate(0.1322915,0.24880412)">
                    <path d="m 0,0 h 200 l -1e-5,19.499997 -3.5,3.500003 H 0 Z" id="path4" vector-effect="non-scaling-stroke" stroke-alignment='inner'/>
                </g>
            </svg>
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