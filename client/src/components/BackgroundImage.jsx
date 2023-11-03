import './styles/BackgroundImage.css'
import { useState, useContext, useEffect } from 'react'
import { BackgroundImageURLContext } from '../App'

function BackgroundImage() {

    const { backgroundImageURL } = useContext(BackgroundImageURLContext);

    const [mousePosition, setMousePosition] = useState({x: 0.5, y: 0.5});
    const [color, setColor] = useState('#000000');

    const mousePositionListener = ({ x, y }) => {
        setMousePosition({x: x/window.innerWidth, y: y/window.innerHeight});
    }

    useEffect(() => {
        window.addEventListener('mousemove', mousePositionListener);
        return (() => {
          window.addEventListener('mousemove', mousePositionListener);
        })
      }, []);

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