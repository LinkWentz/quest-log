import EditableText from './EditableText';
import { useState, useEffect } from 'react';
import API from '../scripts/API';
import { CompleteButton, DefeatButton, DeleteButton } from './StatusButtons';

function Quest(props) {

    const [content, setContent] = useState({
        title: props.title,
        first_objective: 'No Quest Objectives In Latest Step',
        completed: props.completed != undefined ? props.completed : null
    });

    const updateQuestData = ({ title, completed }) => {
        API.update.quest(props.questID, { title, completed });
    }

    const deleteQuest = async () => {
        await API.delete.quest(props.questID);
        props.afterQuestDeletion(props.selected);
    }

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
            <header>
                <EditableText placeholder='Quest Title' onContentChange={(newText) => {setContent({ ...content, title: newText})}} selected={props.selected} onlyEditableIfSelected>
                    {props.title}
                </EditableText>
            </header>
            <footer>{content.first_objective}</footer>
            <CompleteButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DefeatButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DeleteButton delete={deleteQuest} selected={props.selected} onlyClickableIfSelected/>
        </div>
    );
}

export default Quest