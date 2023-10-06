import './styles/EditableText.css';
import { useState, useEffect, useRef } from 'react';


function EditableText(props) {

    const [content, setContent]= useState(props.children);

    useEffect(() => {
        if (props.onContentChange){
            props.onContentChange(content)
        }
    }, [content]);

    const updateContent = (e) => {
        if (e.target.innerText.length <= 1) {
            console.log('a')
            e.preventDefault()
            return;
        }
        const newContent = e.target.innerText;
        setContent(newContent);
    };

    return (
        <span><span className="EditableText" contentEditable={true} suppressContentEditableWarning={true} onInput={updateContent} placeholder='...'>{props.children}</span>&nbsp;</span>
    )
}

export default EditableText;