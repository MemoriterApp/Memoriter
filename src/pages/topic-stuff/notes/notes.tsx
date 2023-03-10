import './notes.css'
import EditorJS from '@editorjs/editorjs';
function Notes() {

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
        }
      });

      return (
        <div className="note-page">
          <h1 className='note-header'>Note Page</h1>
          <div className='note-textarea' id="editorjs"></div>
        </div>
      );
}

export default Notes;