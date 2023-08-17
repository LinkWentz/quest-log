import './styles/SettingsMenu.css'

function SettingsMenu() {
    return (
        <div className="SettingsMenu Glass" tabindex='0'>
            <form>
                <label htmlFor="backgroundImageURL">Background Image URL</label>
                <input className="Interactable" name="backgroundImageURL" type='text'/>
            </form>
        </div>
    );
}   

export default SettingsMenu