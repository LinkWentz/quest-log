import EditableText from './EditableText';
import { useState, useEffect } from 'react';
import API from '../scripts/API';

function Quest(props) {

    const [content, setContent] = useState({
        title: props.title || 'Quest Title',
        first_objective: 'No Quest Objectives In Latest Step',
        completed: props.completed != undefined ? props.completed : null
    });

    const updateQuestData = ({ title, completed }) => {
        API.update.quest(props.questID, { title, completed });
    }

    const deleteQuest = async () => {
        await API.delete.quest(props.questID);
        props.afterQuestDeletion();
    }

    useEffect(() => {
        updateQuestData(content);
    }, [content])

    return (
        <div key={props.key + ' completed: ' + content.completed} 
        className={
            `Quest Interactable 
            ${props.selected ? 'Selected' : ''} 
            ${content.completed == true ? 'Complete' : ''} 
            ${content.completed == false ? 'Defeat' : ''}`} 
        onClick={props.onClick}>
            <header>
            {
                props.selected ? 
                <EditableText onContentChange={(newText) => {setContent({ ...content, title: newText})}}>{props.title}</EditableText> 
                : 
                <span>{props.title}</span> 
            }    
            </header>
            <footer>{content.first_objective}</footer>
            <div className="statusButtons complete" onClick={() => {setContent({...content, completed: content.completed != true ? true : null})}}>✓</div>
            <div className="statusButtons defeat" onClick={() => {setContent({...content, completed: content.completed != false ? false : null})}}>✕</div>
            <div className="statusButtons delete" onClick={() => {deleteQuest()}}>🗑</div>
        </div>
    );
}

export default Quest