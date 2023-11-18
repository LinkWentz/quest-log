import { useState, useEffect } from 'react';
import { CompleteButton, DefeatButton, DeleteButton } from './StatusButtons';
import { CutCornerCard, CheckboxIcon } from './SVGs';
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

    const toggleCompleted = () => {
        let newCompletionState;
        switch (content.completed) {
            case true: 
                newCompletionState = false;
                break;
            case false: 
                newCompletionState = null;
                break;
            case null:
                newCompletionState = true;
                break;
        }

        setContent({
            ...content,
            completed: newCompletionState
        });
        console.log(newCompletionState);
    }

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
            <CutCornerCard />
            <div className="completionStateToggle" onClick={toggleCompleted}>
                <CheckboxIcon symbol={
                    `${content.completed == null ? '!' : ''} 
                     ${content.completed == true ? '✓' : ''} 
                     ${content.completed == false ? '✕' : ''}`
                     .trim()}/>
            </div>
            <EditableText placeholder='Objective Statement' onContentChange={(newText) => {setContent({ ...content, statement: newText})}} selected={props.selected} onlyEditableIfSelected>{props.children}</EditableText>
            <DeleteButton delete={deleteObjective} selected={props.selected} onlyClickableIfSelected/>
        </div>
    )
}
export default Objective