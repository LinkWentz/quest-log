import './styles/StatusButtons.css';
import { CheckboxIcon } from './SVGs';

export function CompleteButton(props) {

    let style = {}

    if (props.onlyClickableIfSelected) {
        style = {
            pointerEvents: props.selected ? 'auto' : 'none'
        }
    }

    const toggleComplete = () => {
        if (props.content.completed != true) {
            props.setContent({...props.content, completed: true})
        }
        else {
            props.setContent({...props.content, completed: null})
        }
    }

    return(
        <div className="statusButtons complete" style={style} onClick={toggleComplete}>
            <CheckboxIcon symbol="✓"></CheckboxIcon>
        </div>
    )
}

export function DefeatButton(props) {

    let style = {}

    if (props.onlyClickableIfSelected) {
        style = {
            pointerEvents: props.selected ? 'auto' : 'none'
        }
    }
    
    const toggleDefeat = () => {
        if (props.content.completed != false) {
            props.setContent({...props.content, completed: false})
        }
        else {
            props.setContent({...props.content, completed: null})
        }
    }

    return(
        <div className="statusButtons defeat" style={style} onClick={toggleDefeat}>
            <CheckboxIcon symbol="✕"></CheckboxIcon>
        </div>
    )
}

export function DeleteButton(props) {

    let style = {}

    if (props.onlyClickableIfSelected) {
        style = {
            pointerEvents: props.selected ? 'auto' : 'none'
        }
    }

    return(
        <div className="statusButtons delete" style={style} onClick={ props.delete }>
            <CheckboxIcon symbol="🗑"></CheckboxIcon>
        </div>
    )
}