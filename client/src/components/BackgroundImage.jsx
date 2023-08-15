import './styles/BackgroundImage.css'
import { useState } from 'react'
import { useContext } from 'react'
import { MousePositionContext } from '../App'

function BackgroundImage() {

    const [color, setColor] = useState('#ffff00');
    const [backgroundImage, setBackgroundImage] = useState(null);

    const mousePosition = useContext(MousePositionContext);

    return (
      <div className="BackgroundImage" style={{
        backgroundColor: color,
        backgroundImage: `url(${backgroundImage})`,
        top: `${-(mousePosition.y-0.5) * 1.5 - 5}%`,
        left: `${-(mousePosition.x-0.5) * 1.5 - 5}%`
      }}/>
    );
  }
  
  export default BackgroundImage