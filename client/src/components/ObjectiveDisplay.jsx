import './styles/ObjectiveDisplay.css';
import Objective from './Objective';
import { useEffect, useState } from 'react';
import API from '../scripts/API';

function ObjectiveDisplay(props) {
    const [objectives, setObjectives] = useState([]);
    const [objectiveElements, setObjectiveElements] = useState([]);

    const [selectedObjective, setSelectedObjective] = useState(0);

    // API interaction
    const refreshObjectiveList = async () => {
        const newObjectives = await API.get.objectivesForStep(props.stepID);
        await setObjectives(newObjectives);
    };

    const createNewObjective = async () => {
        await API.create.objectiveForStep(props.stepID, { statement: '', completed: null });
        refreshObjectiveList();
    }

    // Rendering
    const buildObjectiveElements = () => {
        const newObjectiveElements = [];

        if (objectives && objectives.length > 0) {
            for (const objective in objectives) {
                const currentObjective = objectives[objective];
                const currentObjectiveIsSelected = objective == selectedObjective;

                newObjectiveElements.push(
                    <Objective key={'Objective_' + currentObjective.id}
                    objectiveID={currentObjective.id}
                    selected={currentObjectiveIsSelected}
                    completed={currentObjective.completed}
                    afterObjectiveDeletion={afterObjectiveDeletion}
                    onClick={() => {setSelectedObjective(objective)}}>
                        {currentObjective.statement}
                    </Objective>
                )
            }
        }

        setObjectiveElements(newObjectiveElements);
    }

    const afterObjectiveDeletion = (objectiveWasSelected = false) => {
        if (objectiveWasSelected) {
            setSelectedObjective(selectedObjective > 0 ? selectedObjective - 1 : 0);
        }
        refreshObjectiveList();
    }

    // When step id changes
    useEffect(() => {
        refreshObjectiveList();
    }, [props.stepID]);

    // When selected objective changes or new objective data is recieved
    useEffect(() => {
        buildObjectiveElements();
    }, [objectives, selectedObjective]);

    return (<>{objectiveElements}<div className="newObjective Objective Interactable" onClick={createNewObjective}/></>)
}

export default ObjectiveDisplay;