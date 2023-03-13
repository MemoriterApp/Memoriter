import './notes.css'
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import EditorJS from '@editorjs/editorjs';
import {API} from '@editorjs/editorjs';
import { useState, useEffect } from 'react';

function Notes() {

  class TurnIntoFlashcard {
    static get isInline(): boolean {
      return true;
    }
  
    button: HTMLButtonElement;
  
    render(): HTMLElement {
      this.button = document.createElement('button');
      this.button.type = 'button';
      this.button.innerText = 'Save as Flashcard';
  
      this.button.addEventListener('click', () => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const content = range.cloneContents().textContent?.trim();
  
        console.log(content);
      });
  
      return this.button;
    }
  
    surround(range: any): void {}
  
    checkState(selection: any): void {}
  }
  
  
  

  const [editorData, setEditorData] = useState(null);
  const [saveTimeout, setSaveTimeout] = useState(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: require('@editorjs/header'),
          config: {
            levels: [1, 2, 3],
            defaultLevel: 2,
            shortcut: 'CMD+SHIFT+H',
            inlineToolbar: true,
          },
        },
        checklist: {
          class: require('@editorjs/checklist'),
          shortcut: 'CMD+SHIFT+C'
        },
        list: {
          class: require('@editorjs/list'),
          shortcut: 'CMD+SHIFT+L',
          inlineToolbar: true,
        },
        quote: {
          class: require('@editorjs/quote'),
          shortcut: 'CMD+SHIFT+Q'
        },
        link: {
          class: require('@editorjs/link'),
          shortcut: 'CMD+SHIFT+K'
        },
        turnintoflashcard: {
          class: TurnIntoFlashcard,
        },
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
