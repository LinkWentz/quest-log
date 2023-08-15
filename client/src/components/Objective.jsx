import { useState } from 'react';

function Objective(props) {
    
    const [content, setContent] = useState({
        statement: 'Objective Statement',
        completed: null
    });

    return (
        <div className={`Objective Interactable ${content.completed == true ? 'Complete' : ''} ${content.completed == false ? 'Defeat' : ''}`}>
            {content.statement}
        </div>
    )
}
export default Objective