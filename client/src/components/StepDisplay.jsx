import Objective from './Objective';

function StepDisplay() {
    return (
        <div className="StepDisplay Glass">
            <section>
                <header>Title Text</header>
                <div className="break" />
                <main>Text describing whatever quest you're on, why you're on it, why you have to do what you have to do, what you feel about it, etc.</main>
                <div className="break" />
                <footer>
                    <Objective/>
                    <Objective/>
                    <Objective/>
                    <div className="newObjective Objective Interactable"/>
                </footer>
            </section>
            <nav>
                <button className="next Interactable"/>
                <button className="last Interactable"/>
            </nav>
        </div>
    );
}

export default StepDisplay