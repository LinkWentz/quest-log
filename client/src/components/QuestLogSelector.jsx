import './styles/QuestLogSelector.css'
import Tab from './Tab'

function QuestLogSelector() {
    return (
        <div className="QuestLogSelector Glass">
            <Tab selected>Quest Log</Tab>
            <Tab>Quest Log Name</Tab>
            <div className="newQuestLog Interactable"/>
        </div>
    );
}

export default QuestLogSelector