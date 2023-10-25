import './styles/SettingsMenu.css'
import { BackgroundImageURLContext } from '../App'
import { useContext } from 'react';

function SettingsMenu() {
    const { setBackgroundImageURL } = useContext(BackgroundImageURLContext);
    
    const onInput = (event) => {
        const newURL = event.target.value;
        setBackgroundImageURL(newURL);
    }

    return (
        <div className="SettingsMenu Glass" tabIndex='0'>
            <form>
                <label htmlFor="backgroundImageURL">Background Image URL</label>
                <input className="Interactable" name="backgroundImageURL" type='text' onInput={onInput}/>
            </form>
        </div>
    );
}   

export default SettingsMenu