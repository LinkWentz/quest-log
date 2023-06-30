import './styles/QuestLog.css'
import QuestSelector from './QuestSelector'
import Quest from './Quest'

function QuestLog() {
  return (
    <div className="QuestLog">
      <QuestSelector/>
      <Quest/>
    </div>
  );
}

export default QuestLog
