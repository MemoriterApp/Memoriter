import './notes.css'
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import EditorJS from '@editorjs/editorjs';
import { useState, useEffect } from 'react';

function Notes() {

  const [editorData, setEditorData] = useState(null);
  const [saveTimeout, setSaveTimeout] = useState(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: require('@editorjs/header'),
          shortcut: 'CMD+SHIFT+H'
        },
        checklist: {
          class: require('@editorjs/checklist'),
          shortcut: 'CMD+SHIFT+C'
        },
        list: {
          class: require('@editorjs/list'),
          shortcut: 'CMD+SHIFT+L'
        },
        quote: {
          class: require('@editorjs/quote'),
          shortcut: 'CMD+SHIFT+Q'
        },
        link: {
          class: require('@editorjs/link'),
          shortcut: 'CMD+SHIFT+K'
        }
      },
      data: editorData,
      onChange: () => {
        if (saveTimeout) {
          clearTimeout(saveTimeout);
        }
        setSaveTimeout(setTimeout(() => {
          saveData(editor);
        }, 2000));
      }
    });

    return () => {
      editor.isReady.then(() => {
        editor.destroy();
      });
    }
  }, []);

  const saveData = (editor:any) => {
    const savedData = editor.save().then((outputData:any) => {
      console.log("Data saved: ", outputData);
      setEditorData(outputData);
      setSaveTimeout(null);
    }).catch((error:any) => {
      console.log("Saving failed: ", error);
    });
  };

  return (
    <>
    <div className="note-page">
      <h1 className='note-header'>Note Page</h1>
      <div className='note-textarea' id="editorjs"></div>
    </div>
    </>

  );
}

export default Notes;
