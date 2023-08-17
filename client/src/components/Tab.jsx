import './styles/QuestLogSelector.css'

function Tab(props) {
    return (
        <div className={`Tab ${props.selected ? 'Selected' : 'Interactable'}`}>
            <svg className="overlap left" viewBox="0 0 1 1">
                <path d="M 1,1 L 1,0.5 A 0.5,0.5 0,0,1 0.5,1 L 0.5,1 Z"/>
            </svg>
            <div className="content">{props.children}</div>
            <svg className="overlap right" viewBox="0 0 1 1">
                <path d="M 0,1 L 0,0.5 A 0.5,0.5 0,0,0 0.5,1 L 0.5,1 Z"/>
            </svg>
        </div>
    );
}

export default Tab