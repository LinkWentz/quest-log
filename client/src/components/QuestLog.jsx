import './styles/QuestLogSelector.css'
import { useState, useEffect } from 'react';
import EditableText from './EditableText';
import API from '../scripts/API';
import { DeleteButton } from './StatusButtons';

function QuestLog(props) {

    const [content, setContent] = useState({
        title: props.children
    });

    const updateQuestLogData = ({ title }) => {
        API.update.questLog(props.questLogID, { title: title });
    };

    const deleteQuestLog = async () => {
        await API.delete.questLog(props.questLogID);
        props.afterQuestLogDeletion();
    };

    useEffect(() => {
        updateQuestLogData(content);
    }, [content]);

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
            <DeleteButton delete={deleteQuestLog} selected={props.selected} onlyClickableIfSelected/>

            <svg className="overlap right" viewBox="0 0 1 1">
                <path d="M 0,1 L 0,0.5 A 0.5,0.5 0,0,0 0.5,1 L 0.5,1 Z"/>
            </svg>
        </div>
    );
}

export default QuestLog