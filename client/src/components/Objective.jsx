import { useState } from 'react';

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
            <div className="statusButtons complete" onClick={() => {setContent({...content, completed: content.completed != true ? true : null})}}>✓</div>
            <div className="statusButtons defeat" onClick={() => {setContent({...content, completed: content.completed != false ? false : null})}}>✕</div>
            <div className="statusButtons delete" onClick={() => {deleteObjective()}}>🗑</div>
        </div>
    )
}
export default Objective