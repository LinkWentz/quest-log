import './styles/StepDisplay.css';
import ObjectiveDisplay from './ObjectiveDisplay';
import EditableText from './EditableText';
import { useEffect, useState, useContext } from 'react';
import { SelectedIDsContext } from '../App';
import API from '../scripts/API';
import { DeleteButton } from './StatusButtons';

function StepDisplay() {

    const { selectedIDs } = useContext(SelectedIDsContext);

    const [steps, setSteps] = useState([]);
    const [content, setContent] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [currentStepID, setCurrentStepID] = useState(null);

    const [allowRefresh, setAllowRefresh] = useState(true);


    // API interaction
    const refreshStepList = async () => {
        const newSteps = selectedIDs.selectedQuestID ? await API.get.stepsForQuest(selectedIDs.selectedQuestID) : [];
        await setSteps(newSteps);
    }

    const createNewStep = async () => {
        await API.create.stepForQuest(selectedIDs.selectedQuestID);
        refreshStepList();
    }

    const updateStepData = async ({ title, body }) => {
        await API.update.step(currentStepID, { title, body });
    }

    const deleteStep = async () => {
        await API.delete.step(currentStepID);
        if (steps.length > 1) {
            setCurrentStep(currentStep < steps.length - 2 ? currentStep : steps.length - 2);
        } 
        else {
            setCurrentStep(0);
        }

        refreshStepList();
    }

    const enableRefresh = () => {
        setAllowRefresh(true);
        refreshStepList();
    }

    const disableRefresh = () => {
        setAllowRefresh(false);
    }

    // Rendering
    const nextStep = () => {
        setCurrentStep(currentStep > 0 ? currentStep - 1 : 0);
    }

    const previousStep = () => {
        setCurrentStep(currentStep < steps.length - 1 ? currentStep + 1 : steps.length - 1);
    }

    const loadContentFromStepList = () => {
        if (steps.length > 0 && steps[currentStep].id !== currentStepID) {
            setCurrentStepID(steps[currentStep].id);
            setContent(steps[currentStep]);
        }
        else if (steps.length == 0) {
            setCurrentStepID(null);
            setContent({});
            disableRefresh();
        }
    }

    // When a new quest is selected
    useEffect(() => {
        setCurrentStep(0);
        refreshStepList();
    }, [selectedIDs]);

    // When a new step is selected or new step data is recieved
    useEffect(() => {
        loadContentFromStepList();
    }, [currentStep, steps]);

    // When the client side step data for the currently rendered step changes
    useEffect(() => {
        (async () => {
            await updateStepData(content);
            if (allowRefresh) {
                refreshStepList();
            }
        })();
    }, [content]);

    if (selectedIDs.selectedQuestID) {
        if (steps.length > 0){
            return (
                <div className="StepDisplay Background">
                    <section>
                        <header><div><EditableText onContentChange={(newText) => {setContent({...content, title: newText})}} placeholder={'Step Title'} onFocus={disableRefresh} onBlur={enableRefresh}>{steps[currentStep].title}</EditableText></div></header>
                        <main>
                            <ObjectiveDisplay stepID={currentStepID}/>
                        </main>
                        <div className="break" />
                        <footer><EditableText onContentChange={(newText) => {setContent({...content, body: newText})}} placeholder={'Step Body'} onFocus={disableRefresh} onBlur={enableRefresh}>{steps[currentStep].body}</EditableText></footer>
                        <div className="break" />
                        <nav>
                            <button className="last Interactable" style={{visibility: currentStep == steps.length - 1 ? 'hidden' : 'visible'}} onClick={previousStep}/>
                            <DeleteButton delete={deleteStep}></DeleteButton>
                            <button className={`${currentStep == 0 ? 'add' : 'next'} Interactable`} onClick={currentStep == 0 ? createNewStep : nextStep}/>
                        </nav>
                    </section>
                </div>
            );
        }
        else {
            return (
                <div className="StepDisplay Background">
                    <nav>
                        <button className={`add addFirst Interactable`} onClick={createNewStep}/>
                    </nav>
                </div>
            );
        }
    }
    else {
        return (
            <div className="StepDisplay Background"></div>
        );
    }

}

export default StepDisplay