import './styles/BackgroundImage.css';
import { useContext } from 'react';
import { BackgroundImageURLContext } from '../App';

function BackgroundImage() {

    const { backgroundImageURL } = useContext(BackgroundImageURLContext);

    return (
        <div className="BackgroundImage" style={{backgroundImage: `url(${backgroundImageURL})`}} />
    );
}

export default BackgroundImage