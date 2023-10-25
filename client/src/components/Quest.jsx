import { useState, useEffect } from 'react';

function Quest(props) {

    const [content, setContent] = useState({
        title: props.title || 'Quest Title',
        first_objective: 'No Quest Objectives In Latest Step',
        completed: null
    });

    return (
        <div key={props.key + ' completed: ' + content.completed} className={`Quest Interactable ${props.selected ? 'Selected' : ''} ${content.completed == true ? 'Complete' : ''} ${content.completed == false ? 'Defeat' : ''}`}>
            <header>{content.title}</header>
            <footer>{content.first_objective}</footer>
            <div className="statusButtons complete" onClick={() => {setContent({...content, completed: content.completed != true ? true : null})}}>✓</div>
            <div className="statusButtons defeat" onClick={() => {setContent({...content, completed: content.completed != false ? false : null})}}>✕</div>
            <div className="statusButtons delete" onClick={() => {deleteQuest()}}>🗑</div>
        </div>
    );
}

export default Quest