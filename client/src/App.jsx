import './App.css'
import BackgroundImage from './components/BackgroundImage'
import QuestLogSelector from './components/QuestLogSelector'
import SettingsMenu from './components/SettingsMenu'
import QuestSelector from './components/QuestSelector'
import StepDisplay from './components/StepDisplay'
import { useState, useEffect, createContext } from 'react'

export const MousePositionContext = createContext({x: 0.5, y: 0.5});
export const SelectedIDsContext = createContext({});
export const BackgroundImageURLContext = createContext({});

function App() {

  const [mousePositionState, setMousePositionState] = useState({x: 0.5, y: 0.5});
  const [selectedIDs, setSelectedIDs] = useState({selectedQuestLogID: null, selectedQuestID: null});
  const [backgroundImageURL, setBackgroundImageURL] = useState('');

  useEffect(() => {
    const setMousePosition = ({x, y}) => {
      setMousePositionState({x: x/window.innerWidth, y: y/window.innerHeight});
    }
    window.addEventListener('mousemove', setMousePosition);
    return (() => {
      window.addEventListener('mousemove', setMousePosition);
    })
  }, [])

  return (
    <BackgroundImageURLContext.Provider value={{backgroundImageURL, setBackgroundImageURL}}>
      <SelectedIDsContext.Provider value={{selectedIDs, setSelectedIDs}}>
        <MousePositionContext.Provider value={mousePositionState}>
          <div className="App">
            <BackgroundImage/>
            <QuestLogSelector/>
            <SettingsMenu></SettingsMenu>
            <QuestSelector/>
            <StepDisplay/>
          </div>
        </MousePositionContext.Provider>
      </SelectedIDsContext.Provider>
    </BackgroundImageURLContext.Provider>
  )
}

export default App
