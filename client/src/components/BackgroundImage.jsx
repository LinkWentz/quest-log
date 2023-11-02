import './styles/BackgroundImage.css'
import { useState, useContext } from 'react'
import { MousePositionContext, BackgroundImageURLContext } from '../App'

function BackgroundImage() {

    const { backgroundImageURL } = useContext(BackgroundImageURLContext);
    const mousePosition = useContext(MousePositionContext);

    const [color, setColor] = useState('#000000');

    return (
        <div className="BackgroundImage" style={{
            backgroundColor: color,
            backgroundImage: `url(${backgroundImageURL})`,
            top: `${-(mousePosition.y - 0.5) * 1.5 - 5}%`,
            left: `${-(mousePosition.x - 0.5) * 1.5 - 5}%`
        }} />
    );
}

export default BackgroundImage