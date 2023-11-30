import './styles/Cursor.css'
import { CursorIcon } from './SVGs'
import { useState, useEffect } from 'react'

function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [clicking, setClicking] = useState(false);

    const updateMousePosition = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        });
    }

    const onMouseDown = (event) => {
        setClicking(true);
    }

    const onMouseUp = (event) => {
        setClicking(false);
    }

    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        }
    }, []);

    return (
        <div className={`Cursor ${clicking ? 'Clicking' : ''}`} style={{ top: mousePosition.y, left: mousePosition.x }}>
            <CursorIcon />
        </div>
    );
}

export default Cursor