import './styles/BackgroundImage.css'
import { useState } from 'react'

function BackgroundImage() {

    const [color, setColor] = useState('#ffff00');
    const [backgroundImage, setBackgroundImage] = useState(null);

    return (
      <div className="BackgroundImage" style={{backgroundColor: color, backgroundImage: backgroundImage}}/>
    );
  }
  
  export default BackgroundImage