import { useState, useEffect } from 'react';
import { CompleteButton, DefeatButton, DeleteButton } from './StatusButtons';
import EditableText from './EditableText';
import API from '../scripts/API';

function Objective(props) {
    
    const [content, setContent] = useState({
        statement: props.children,
        completed: props.completed != undefined ? props.completed : null
    });

    const updateObjectiveData = ({ statement, completed }) => {
        API.update.objective(props.objectiveID, {statement, completed});
    }

    const deleteObjective = async () => {
        await API.delete.objective(props.objectiveID);
        props.afterObjectiveDeletion(props.selected);
    };

    useEffect(() => {
        updateObjectiveData(content);
    }, [content]);

    return (
        <div className={
            `Objective Interactable 
            ${props.selected ? 'Selected' : ''} 
            ${content.completed == true ? 'Complete' : ''} 
            ${content.completed == false ? 'Defeat' : ''}`} 
        onClick={props.onClick}>
            <svg preserveAspectRatio='none' viewBox="0 0 200 23">
                <g id="layer1" transform="translate(0.1322915,0.24880412)">
                    <path d="m 0,0 h 200 l -1e-5,19.499997 -3.5,3.500003 H 0 Z" id="path4"/>
                </g>
            </svg>
            <EditableText placeholder='Objective Statement' onContentChange={(newText) => {setContent({ ...content, statement: newText})}} selected={props.selected} onlyEditableIfSelected>{props.children}</EditableText>
            <CompleteButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DefeatButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DeleteButton delete={deleteObjective} selected={props.selected} onlyClickableIfSelected/>
        </div>
    )
}
export default Objective