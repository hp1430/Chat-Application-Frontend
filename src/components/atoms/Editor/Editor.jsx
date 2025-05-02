import 'quill/dist/quill.snow.css'; // import the quill editor css

import Quill from 'quill';
import { useEffect, useRef } from 'react';

export const Editor = ({
    variant = 'create',
    onSubmit,
    onCancel,
    placeholder,
    disabled,
    defaultValue
}) => {
 
    const containerRef = useRef(); // reqd to initialize the editor
    const defaultValueRef = useRef();
    const quillRef = useRef();

    useEffect(() => {
        if(!containerRef.current) return ; // if containerRef is not initialized, return
        const container = containerRef.current; // get the container element

        const editorContainer = container.appendChild(container.ownerDocument.createElement('div')); // create a new div element for the editor and append it to the container

        const options = {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link', 'image'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean']
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: 'Enter',
                            handler: () => {
                                return;
                            }
                        },
                        shift_enter: {
                            key: 'Enter',
                            shiftKey: true,
                            handler: () => {
                                quill.insertText(quill.getSelection()?.index || 0, '\n'); // insert a new line
                            }
                        }
                    }
                }
            }
        };

        const quill = new Quill(editorContainer, options); // initialize the quill editor with the options

        quillRef.current = quill; // set the quillRef to the quill instance
        quillRef.current.focus(); // focus on the editor

        quill.setContents(defaultValueRef.current); // set the default value of the editor
    }, []);

    return (
        <div
            className='flex flex-col'
        >
 
            <div
                className='flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white'
            >
                <div className='h-full ql-custom' ref={containerRef} />
            </div>
 
            <p
                className='p-2 text-[10px] text-mutes-foreground flex justify-end'
            >
                <strong>Shift + return</strong> &nbsp; to add a new line
            </p>

        </div>
    );
};