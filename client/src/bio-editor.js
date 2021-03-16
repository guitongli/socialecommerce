import { useState, useEffect } from 'react';
import axios from './axios';

export default function BioEditor(props) {
    const [username, setUserName] = useState();
    const [yourname, setYourName] = useState();
    const [newBio, setNewBio] = useState();
    const [editorVisible, setEditorVisible] = useState(false);
    const [buttonEdit, setButtonEdit] = useState();
    useEffect(function () {
        console.log('bio props', props);
        if (props.oldbio) { setButtonEdit(true);}

    });

    async function saveBio() {
        props.updateBio(newBio);

        setEditorVisible(false);
        const result = await axios.post('/save/bio', { username: props.username, bio: newBio });
        console.log('saved bio', result);
    }

    function toggleArea() {
        setEditorVisible(!editorVisible);
    }

    if (editorVisible) {
        return (
            <div className="bio-editor">
                <textarea name="bio" onChange={e => { setNewBio(e.target.value); console.log('hi', e.target.value, 'bio', newBio); }} />
                <button onClick={saveBio}>save</button><button onClick={toggleArea}>cancel</button>
            </div>
        );
    } else {
        if (props.oldbio) {
            return (
                <div>
                    <button onClick={toggleArea}>edit</button>
                </div>
            );
        } else {
            return <button onClick={toggleArea}>add</button>;
        }
    }
}
