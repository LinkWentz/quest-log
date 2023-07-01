import './styles/QuestLog.css'
import QuestSelector from './QuestSelector'
import Quest from './Quest'
import { useContext } from 'react'
import { MousePositionContext } from '../App'

function QuestLog() {

  const mousePosition = useContext(MousePositionContext);

  return (
    <div className="QuestLog" style={{top: `${-(mousePosition.y-0.5) * 1.5}%`, left: `${-(mousePosition.x-0.5) * 1.5}%`}}>
      <QuestSelector/>
      <Quest/>
    </div>
  );
}

export default QuestLog
