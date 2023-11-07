import Objective from './Objective';
import EditableText from './EditableText';
import { useEffect, useState, useContext } from 'react';
import { SelectedIDsContext } from '../App';
import API from '../scripts/API';

function StepDisplay() {

    const { selectedIDs } = useContext(SelectedIDsContext);

    const [steps, setSteps] = useState([{
        title: '',
        body: ''
    }]);
    const [currentStep, setCurrentStep] = useState(0);
    const [content, setContent] = useState({
        title: '',
        body: ''
    });

    const refreshStepList = async () => {
        const newSteps = selectedIDs.selectedQuestID ? await API.get.stepsForQuest(selectedIDs.selectedQuestID) : [];
        setSteps(newSteps);
    }

    const createNewStep = async () => {
        await API.create.stepForQuest(selectedIDs.selectedQuestID);
        refreshStepList();
    }

    const updateStepData = ({ title, body }) => {
        API.update.step(content.stepID, { title, body });
    }

    const deleteStep = async () => {
        await API.delete.step(content.stepID);
        previousStep();
    }

    const nextStep = () => {
        setCurrentStep(currentStep > 0 ? currentStep - 1 : 0);
    }

    const previousStep = () => {
        setCurrentStep(currentStep < steps.length - 1 ? currentStep + 1 : steps.length - 1);
    }

    useEffect(() => {
        if (steps.length > 0) {
            setContent(steps[currentStep]);
        }
    }, [currentStep, steps]);

    useEffect(() => {
        updateStepData(content);
    }, [content]);

    useEffect(() => {
        refreshStepList();
    }, [selectedIDs]);

    return (
        <div className="StepDisplay Glass">
            <section>
                <header><EditableText onContentChange={(newText) => {setContent({...content, title: newText})}}>{content.title || '...'}</EditableText></header>
                <div className="break" />
                <main><EditableText onContentChange={(newText) => {setContent({...content, body: newText})}}>{content.body || '...'}</EditableText></main>
                <div className="break" />
                <footer>
                    <Objective/>
                    <Objective/>
                    <Objective/>
                    <div className="newObjective Objective Interactable"/>
                </footer>
            </section>
            <nav>
                <button className="next Interactable" onClick={nextStep}/>
                <button className="last Interactable" onClick={previousStep}/>
            </nav>
        </div>
    );
}

export default StepDisplay