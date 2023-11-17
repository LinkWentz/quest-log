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
            <div className="content">
                &nbsp;<EditableText onContentChange={(newText) => {setContent({ ...content, title: newText})}} placeholder='Quest Log Title' selected={props.selected} onlyEditableIfSelected>{props.children}</EditableText>
            </div>
        </div>
    );
}

export default QuestLog