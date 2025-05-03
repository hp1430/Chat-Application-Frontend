import 'quill/dist/quill.snow.css'; // import the quill editor css

import { ImageIcon, XIcon } from 'lucide-react';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { PiTextAa } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

import { Hint } from '../Hint/Hint';

export const Editor = ({ onSubmit }) => {

    const [isToolbarVisible, setIsToolbarVisible] = useState(false); // state to manage the visibility of the toolbar

    const [image, setImage] = useState(null);
 
    const containerRef = useRef(); // reqd to initialize the editor
    const defaultValueRef = useRef();
    const quillRef = useRef();
    const imageInputRef = useRef(null);

    function toggleToolbar() {
        setIsToolbarVisible(!isToolbarVisible); // toggle the visibility of the toolbar
        const toolbar = containerRef.current.querySelector('.ql-toolbar'); // get the toolbar element
        if(toolbar) {
            toolbar.classList.toggle('hidden'); // toggle the hidden class on the toolbar element
        }
    }

    useEffect(() => {
        if(!containerRef.current) return ; // if containerRef is not initialized, return
        const container = containerRef.current; // get the container element

        const editorContainer = container.appendChild(container.ownerDocument.createElement('div')); // create a new div element for the editor and append it to the container

        const options = {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
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
                {
                    image && (
                        <div
                            className='p-2'
                        >
                            <div
                                className='relative size-[60px] flex items-center justify-center group/image'
                            >
                                <button
                                    className='hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center'
                                    onClick={() => {
                                        setImage(null);
                                        imageInputRef.current='';
                                    }}
                                >
                                    <XIcon className='size-4' />
                                </button>
                                <img 
                                    src={URL.createObjectURL(image)}
                                    className='rounded-xl overflow-hidden border object-cover'
                                />
                            </div>
                        </div>
                    )
                }
                    <div className='flex px-2 pb-2 z-[5]'>
                        <Hint label={isToolbarVisible ? 'Show formatting options' : 'Hide formatting options'} side='bottom' align='center'>
                            <Button
                                size='icon-sm'
                                variant='ghost'
                                disabled={false}
                                onClick={toggleToolbar}
                            >
                                <PiTextAa className='size-4' />
                            </Button>
                        </Hint>

                        <Hint label="Image">
                            <Button
                                size='icon-sm'
                                variant='ghost'
                                disabled={false}
                                onClick={() => { imageInputRef.current.click(); }}
                            >
                                <ImageIcon className='size-4' />
                            </Button>
                        </Hint>

                        <input 
                            type='file'
                            className='hidden'
                            ref={imageInputRef}
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <Hint label='Send Message'>
                            <Button
                                size='iconSm'
                                disabled={false}
                                className='ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white'
                                onClick={() => {
                                    const messageContent = JSON.stringify(quillRef.current.getContents()); // get the contents of the editor
                                    onSubmit({ body: messageContent, image });
                                    quillRef.current.setContents([]); // clear the editor after submitting the message
                                    setImage(null);
                                    imageInputRef.current = '';
                                }}
                            >
                                <MdSend className='size-4' />
                            </Button>
                        </Hint>
                    </div>
            </div>
 
            <p
                className='p-2 text-[10px] text-mutes-foreground flex justify-end'
            >
                <strong>Shift + return</strong> &nbsp; to add a new line
            </p>

        </div>
    );
};