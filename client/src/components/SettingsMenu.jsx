import './styles/SettingsMenu.css'
import { BackgroundImageURLContext, SelectedIDsContext } from '../App'
import { useContext, useEffect } from 'react';
import API from '../scripts/API';

function SettingsMenu() {
    
    const { backgroundImageURL, setBackgroundImageURL } = useContext(BackgroundImageURLContext);
    const { selectedIDs } = useContext(SelectedIDsContext);
    
    const onInput = (event) => {
        const newURL = event.target.value;
        setBackgroundImageURL(newURL);
        
        (async () => {
            await API.update.questLog(selectedIDs.selectedQuestLogID, { backgroundImageURL: newURL });
        })();
    }

    const pasteFromClipboard = async (event) => {
        event.preventDefault();
        const text = await navigator.clipboard.readText();
        setBackgroundImageURL(text);
    }
    
    useEffect(() => {
        if (selectedIDs.selectedQuestLogID != null && selectedIDs.selectedQuestLogID) {
            (async () => {
                const selectedQuestLog = await API.get.questLog(selectedIDs.selectedQuestLogID);
                if (selectedQuestLog.length > 0) {
                    await setBackgroundImageURL(selectedQuestLog[0].background_image_url);
                }
            })();
        }
    }, [selectedIDs]);

    return (
        <div className="SettingsMenu Background" tabIndex='0'>
            <header>Settings</header>
            <form>
                <label htmlFor="backgroundImageURL">Background Image URL</label>
                <input className="Interactable" name="backgroundImageURL" type='text' placeholder="..." onInput={onInput} value={backgroundImageURL} />
                <button onClick={pasteFromClipboard}>PASTE FROM CLIPBOARD</button>
            </form>
        </div>
    );
}   

export default SettingsMenu