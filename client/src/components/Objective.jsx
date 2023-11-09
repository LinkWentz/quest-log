import { useState } from 'react';
import { CompleteButton, DefeatButton, DeleteButton } from './StatusButtons';
import API from '../scripts/API';

function Objective(props) {
    
    const [content, setContent] = useState({
        statement: props.children,
        completed: props.completed || null
    });

    const deleteObjective = async () => {
        await API.delete.objective(props.objectiveID);
        props.afterObjectiveDeletion(props.selected);
    };

    return (
        <div className={
            `Objective Interactable 
            ${props.selected ? 'Selected' : ''} 
            ${content.completed == true ? 'Complete' : ''} 
            ${content.completed == false ? 'Defeat' : ''}`} 
        onClick={props.onClick}>
            {content.statement}
            <CompleteButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DefeatButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DeleteButton delete={deleteObjective} selected={props.selected} onlyClickableIfSelected/>
        </div>
    )
}
export default Objective