import Objective from './Objective';
import { useEffect, useState } from 'react';
import API from '../scripts/API';

function ObjectiveDisplay(props) {
    const [objectives, setObjectives] = useState([]);
    const [objectiveElements, setObjectiveElements] = useState([]);

    const [selectedObjective, setSelectedObjective] = useState(0);

    const refreshObjectiveList = async () => {
        console.log(props.stepID);
        const newObjectives = await API.get.objectivesForStep(props.stepID);
        await setObjectives(newObjectives);
    };

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
                    onClick={() => {setSelectedObjective(objective)}}>
                        {currentObjective.statement}
                    </Objective>
                )
            }
        }

        setObjectiveElements(newObjectiveElements);
    }

    useEffect(() => {
        refreshObjectiveList();
    }, [props.stepID]);

    useEffect(() => {
        buildObjectiveElements();
    }, [objectives, selectedObjective]);

    return (<>{objectiveElements}<div className="newObjective Objective Interactable"/></>)
}

export default ObjectiveDisplay;