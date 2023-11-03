import { useState } from 'react';
import { CompleteButton, DefeatButton, DeleteButton } from './StatusButtons';

function Objective(props) {
    
    const [content, setContent] = useState({
        statement: 'Objective Statement',
        completed: null
    });

    const deleteObjective = () => {

    };

    return (
        <div key={props.key + ' completed: ' + content.completed} className={`Objective Interactable ${content.completed == true ? 'Complete' : ''} ${content.completed == false ? 'Defeat' : ''}`}>
            {content.statement}
            <CompleteButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DefeatButton content={content} setContent={setContent} selected={props.selected} onlyClickableIfSelected/>
            <DeleteButton delete={deleteObjective} selected={props.selected} onlyClickableIfSelected/>
        </div>
    )
}
export default Objective