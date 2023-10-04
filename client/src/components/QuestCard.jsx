import { useState } from 'react';

function QuestCard(props) {

    const [content, setContent] = useState({
        title: props.title || 'Title Text',
        first_objective: 'Objective Text',
        completed: null
    });

    const deleteQuest = () => {

    };

    return (
        <div key={props.key + ' completed: ' + content.completed} className={`QuestCard Interactable ${content.completed == true ? 'Complete' : ''} ${content.completed == false ? 'Defeat' : ''}`}>
            <header>{content.title}</header>
            <footer>{content.first_objective}</footer>
            <div className="statusButtons complete" onClick={() => {setContent({...content, completed: content.completed != true ? true : null})}}>✓</div>
            <div className="statusButtons defeat" onClick={() => {setContent({...content, completed: content.completed != false ? false : null})}}>✕</div>
            <div className="statusButtons delete" onClick={() => {deleteQuest()}}>🗑</div>
        </div>
    );
}

export default QuestCard