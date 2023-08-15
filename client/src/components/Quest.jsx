import Objective from './Objective';

function Quest() {
    return (
        <div className="Quest Glass">
            <header>Title Text</header>
            <div className="break" />
            <main>Text describing whatever quest you're on, why you're on it, why you have to do what you have to do, what you feel about it, etc.</main>
            <div className="break" />
            <footer>
                <Objective/>
                <Objective/>
                <Objective/>
            </footer>
            <button className="editButton Glint">Edit</button>
        </div>
    );
}

export default Quest