import './styles/EditableText.css';
import { useState, useEffect, useRef } from 'react';


function EditableText(props) {

    const [content, setContent]= useState(props.children || props.placeholder);
    
    let editable = false;
    if (props.selected || !props.onlyEditableIfSelected) {
        editable = true;
    }

    useEffect(() => {
        if (props.onContentChange){
            props.onContentChange(content)
        }
    }, [content]);

    const updateContent = (e) => {
        e.preventDefault();

        const newContent = e.target.innerText;
        setContent(newContent);
    };

    const onFocus = (e) => {
        if (props.onFocus) {
            props.onFocus(e);
        }
    }

    const onBlur = (e) => {
        if (e.target.innerText == '') {
            e.target.innerText = props.placeholder;
        }

        if (props.onBlur) {
            props.onBlur(e);
        }
    }

    return (
        <span>
            <span className="EditableText" 
            contentEditable={editable} 
            suppressContentEditableWarning={true} 
            onInput={updateContent}
            onFocus={onFocus} 
            onBlur={onBlur}>
                {props.children || props.placeholder || '...'}
            </span>
            &nbsp;
        </span>
    )
}

export default EditableText;