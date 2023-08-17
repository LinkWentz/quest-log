import './App.css'
import BackgroundImage from './components/BackgroundImage'
import QuestLogSelector from './components/QuestLogSelector'
import QuestLog from './components/QuestLog'
import { useState, useEffect, createContext } from 'react'

export const MousePositionContext = createContext({x: 0.5, y: 0.5});

function App() {

  const [mousePositionState, setMousePositionState] = useState({x: 0.5, y: 0.5});

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
    <MousePositionContext.Provider value={mousePositionState}>
      <BackgroundImage/>
      <QuestLogSelector/>
      <QuestLog/>
    </MousePositionContext.Provider>
  )
}

export default App
