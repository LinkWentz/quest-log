import './styles/EditableText.css';
import { useState, useEffect, useRef } from 'react';


function EditableText(props) {
 
    const initialState = useRef(props.children);

    const [content, setContent]= useState(props.children);

    useEffect(() => {
        if (props.onContentChange){
            props.onContentChange(content)
        }
    }, [content]);

    const updateContent = (e) => {
        const newContent = e.target.innerText;
        if (newContent.length > 0) {
            setContent(newContent);
        }
        else {
            setContent(props.placeholder);
        }
    };

    return (
        <span className="EditableText" contentEditable='true' placeholder={initialState.current} onInput={updateContent}>{props.children}</span>
    )
}

export default EditableText;