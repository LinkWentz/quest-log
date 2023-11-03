import './styles/SettingsMenu.css'
import { BackgroundImageURLContext, SelectedIDsContext } from '../App'
import { useContext, useEffect } from 'react';
import API from '../scripts/API';

function SettingsMenu() {
    const { setBackgroundImageURL } = useContext(BackgroundImageURLContext);
    const { selectedIDs } = useContext(SelectedIDsContext);
    
    const onInput = (event) => {
        const newURL = event.target.value;
        setBackgroundImageURL(newURL);
        
        (async () => {
            await API.update.questLog(selectedIDs.selectedQuestLogID, { backgroundImageURL: newURL });
        })();
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
        <div className="SettingsMenu Glass" tabIndex='0'>
            <form>
                <label htmlFor="backgroundImageURL">Background Image URL</label>
                <input className="Interactable" name="backgroundImageURL" type='text' onInput={onInput}/>
            </form>
        </div>
    );
}   

export default SettingsMenu