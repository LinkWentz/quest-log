import { useState } from 'react';

function QuestCard(props) {

    const [content, setContent] = useState({
        title: 'Title Text',
        first_objective: 'Objective Text',
        completed: null
    });

    return (
        <div key={props.key + ' completed: ' + content.completed} className={`QuestCard Interactable ${content.completed == true ? 'Complete' : ''} ${content.completed == false ? 'Defeat' : ''}`}>
            <header>{content.title}</header>
            <footer>{content.first_objective}</footer>
            <div className="statusButtons complete" onClick={() => {setContent({...content, completed: true})}}>✓</div>
            <div className="statusButtons defeat" onClick={() => {setContent({...content, completed: false})}}>✕</div>
            <div className="statusButtons delete" onClick={() => {setContent({...content, completed: null})}}>🗑</div>
        </div>
    );
}

export default QuestCard