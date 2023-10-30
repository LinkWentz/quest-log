import EditableText from './EditableText';
import { useState, useEffect } from 'react';

function Quest(props) {

    const [content, setContent] = useState({
        title: props.title || 'Quest Title',
        first_objective: 'No Quest Objectives In Latest Step',
        completed: props.completed != undefined ? props.completed : null
    });

    useEffect(() => {
        updateQuestData(content);
    }, [content])

    const updateQuestData = ({ title, completed }) => {
        fetch(`http://localhost:3000/quests/${props.questID}`, {
            method: 'PATCH',
            body: JSON.stringify({
                quest_title: title || null,
                quest_completed: completed != undefined ? completed : null
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }

    const deleteQuest = async () => {
        await fetch(`http://localhost:3000/quests/${props.questID}`, {
            method: 'DELETE'
        });

        props.afterQuestDeletion();
    }

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