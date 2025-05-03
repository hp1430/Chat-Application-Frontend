import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';

export const MessageRenderer = ({ value }) => {

    const rendererRef = useRef(null);
    const [isEmpty, setIsEmpty] = useState(false); // state to manage the empty state of the editor

    useEffect(() => {
        if(!rendererRef.current) return; // if rendererRef is not initialized, return

        const quill = new Quill(document.createElement('div'), {
            theme: 'snow'
        }); // initialize the quill editor with the options

        // Disable editing
        quill.disable(); // disable the editor
        const content = JSON.parse(value); // parse the value to JSON
        quill.setContents(content); // set the contents of the editor

        const isContentEmpty = quill.getText().trim().length === 0; // check if the content is empty
        setIsEmpty(isContentEmpty); // set the empty state of the editor

        rendererRef.current.innerHTML = quill.root.innerHTML; // set the innerHTML of the rendererRef to the innerHTML of the quill editor

    }, [value]);

    if(isEmpty) return null; // if the editor is empty, return null

    return (
        <div ref={rendererRef} className="ql-editor ql-renderer" />
    );
};