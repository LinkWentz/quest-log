import QuestCard from './QuestCard'

function QuestSelector() {
    return (
        <div className="QuestSelector Glass">
            <QuestCard title="Title Text">Objective Text</QuestCard>
            <QuestCard title="Title Text">Objective Text</QuestCard>
            <QuestCard title="Title Text">Objective Text</QuestCard>
            <button className="QuestCard Interactable">+</button>
        </div>
    );
}

export default QuestSelector