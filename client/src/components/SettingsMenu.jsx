import './styles/SettingsMenu.css'
import { BackgroundImageURLContext, SelectedIDsContext } from '../App'
import { useContext, useEffect } from 'react';

function SettingsMenu() {
    const { setBackgroundImageURL } = useContext(BackgroundImageURLContext);
    const { selectedIDs } = useContext(SelectedIDsContext);
    
    const onInput = (event) => {
        const newURL = event.target.value;

        setBackgroundImageURL(newURL);
        
        (async () => {
            await fetch(`http://localhost:3000/questlogs/${selectedIDs.selectedQuestLogID}/backgroundimageurl`, {
                method: 'PATCH',
                body: JSON.stringify({
                    quest_log_background_image_url: newURL
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
        })();
    }

    useEffect(() => {
        if (selectedIDs.selectedQuestLogID) {
            (async () => {
                let selectedQuestLog = {};
                selectedQuestLog = await (await fetch(`http://localhost:3000/questlog/${selectedIDs.selectedQuestLogID}`)).json();
                await setBackgroundImageURL(selectedQuestLog[0].background_image_url);
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