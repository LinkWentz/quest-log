import { useState } from 'react';

function Objective(props) {
    
    const [content, setContent] = useState({
        statement: 'Objective Statement',
        completed: null
    });

    return (
        <div key={props.key + ' completed: ' + content.completed} className={`Objective Interactable ${content.completed == true ? 'Complete' : ''} ${content.completed == false ? 'Defeat' : ''}`}>
            {content.statement}
            <div className="statusButtons complete" onClick={() => {setContent({...content, completed: true})}}>✓</div>
            <div className="statusButtons defeat" onClick={() => {setContent({...content, completed: false})}}>✕</div>
            <div className="statusButtons delete" onClick={() => {setContent({...content, completed: null})}}>🗑</div>
        </div>
    )
}
export default Objective