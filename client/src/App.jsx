import './App.css'
import BackgroundImage from './components/BackgroundImage'
import QuestLogSelector from './components/QuestLogSelector'
import SettingsMenu from './components/SettingsMenu'
import QuestSelector from './components/QuestSelector'
import StepDisplay from './components/StepDisplay'
import Cursor from './components/Cursor'
import { useState, createContext } from 'react'

export const BackgroundImageURLContext = createContext({});
export const SelectedIDsContext = createContext({});

function App() {

  const [selectedIDs, setSelectedIDs] = useState({ selectedQuestLogID: null, selectedQuestID: null });
  const [backgroundImageURL, setBackgroundImageURL] = useState('');

  return (
    <BackgroundImageURLContext.Provider value={{ backgroundImageURL, setBackgroundImageURL }}>
      <SelectedIDsContext.Provider value={{ selectedIDs, setSelectedIDs }}>
        <div className="App">
          <BackgroundImage/>
          <QuestLogSelector/>
          <SettingsMenu/>
          <QuestSelector/>
          <StepDisplay/>
          <Cursor/>
        </div>
      </SelectedIDsContext.Provider>
    </BackgroundImageURLContext.Provider>
  )
}

export default App
