import Objective from './Objective';

function Quest() {
  return(
    <div className="Quest">
        <div className="Glass">
            <header>Title Text</header>
            <main>Text describing whatever quest you're on, why you're on it, why you have to do what you have to do, what you feel about it, etc.</main>
            <footer>
                <form>
                    <Objective>Objective Text</Objective>
                    <Objective>Objective Text</Objective>
                    <Objective>Objective Text</Objective>
                </form>
            </footer>
        </div>
    </div>
  );
}

export default Quest