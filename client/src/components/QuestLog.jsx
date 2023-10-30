import './styles/QuestLogSelector.css'
import { useState, useEffect } from 'react';
import EditableText from './EditableText';

function QuestLog(props) {

    const [content, setContent] = useState({
        title: props.children
    });

    useEffect(() => {
        updateQuestLogData(content);
    }, [content]);

    const updateQuestLogData = ({title}) => {
        fetch(`http://localhost:3000/questlogs/${props.questLogID}`, {
            method: 'PATCH',
            body: JSON.stringify({
                quest_log_title: title || null
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    };

    const deleteQuestLog = async () => {
        await fetch(`http://localhost:3000/questlogs/${props.questLogID}`, {
            method: 'DELETE'
        });

        props.afterQuestLogDeletion();
    };

    return (
        <div className={`QuestLog ${props.selected ? 'Selected' : 'Interactable'}`} onClick={props.onClick}>
            <svg className="overlap left" viewBox="0 0 1 1">
                <path d="M 1,1 L 1,0.5 A 0.5,0.5 0,0,1 0.5,1 L 0.5,1 Z"/>
            </svg>

            {
                props.selected ? 
                    <div className="content">
                        <EditableText onContentChange={(newText) => {setContent({ ...content, title: newText})}}>{props.children}</EditableText>
                    </div>
                :
                    <div className="content">{props.children}</div>
            }
            <div className="statusButtons delete" onClick={() => {deleteQuestLog()}}>🗑</div>

            <svg className="overlap right" viewBox="0 0 1 1">
                <path d="M 0,1 L 0,0.5 A 0.5,0.5 0,0,0 0.5,1 L 0.5,1 Z"/>
            </svg>
        </div>
    );
}

export default QuestLog