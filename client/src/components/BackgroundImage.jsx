import './styles/BackgroundImage.css'
import { useState, useContext, useEffect } from 'react'
import { MousePositionContext, BackgroundImageURLContext } from '../App'

function BackgroundImage() {

    const { backgroundImageURL } = useContext(BackgroundImageURLContext);

    const [color, setColor] = useState('#000000');
    const [backgroundImage, setBackgroundImage] = useState(null);

    useEffect(() => {
        setBackgroundImage(backgroundImageURL);
    }, [backgroundImageURL]);

    const mousePosition = useContext(MousePositionContext);

    return (
        <div className="BackgroundImage" style={{
            backgroundColor: color,
            backgroundImage: `url(${backgroundImage})`,
            top: `${-(mousePosition.y - 0.5) * 1.5 - 5}%`,
            left: `${-(mousePosition.x - 0.5) * 1.5 - 5}%`
        }} />
    );
}

export default BackgroundImage