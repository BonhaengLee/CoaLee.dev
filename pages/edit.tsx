import React from 'react'
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import { mediaBlockRenderer } from 'components/entities/mediaBlockRenderer'
import { LinkBlockRenderer } from 'components/entities/LinkBlockRenderer'

function PageContainer() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  )

  const onChange = (editorState) => {
    setEditorState(editorState)
  }

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const [urlValue, setUrlValue] = React.useState()

  const onURLChange = (e) => setUrlValue(e.target.value)

  const editor = React.useRef(null)

  const focus = () => editor.current.focus()

  const onAddImage = (e) => {
    e.preventDefault()
    const edState = editorState
    const urlValue = window.prompt('Paste Image Link')
    const contentState = edState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      {
        src: urlValue
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(
      edState,
      { currentContent: contentStateWithEntity },
      'create-entity'
    )
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    )
    // 무슨 용도?
    // () => {
    //   setTimeout(() => focus(), 0);
    // })
  }

  const onAddLink = (e) => {
    e.preventDefault()
    const edState = editorState
    const urlValue = window.prompt('Paste Website Link')
    const contentState = edState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'link',
      'IMMUTABLE',
      {
        href: urlValue
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(
      edState,
      { currentContent: contentStateWithEntity },
      'create-entity'
    )
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    )
    // 무슨 용도?
    // () => {
    //   setTimeout(() => focus(), 0);
    // })
  }

  // onUnderlineClick = () => {
  //   onChange(
  //     RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
  //   );
  // };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  return (
    <div className='editorContainer'>
      <div className='menuButtons'>
        {/* <button onClick={onUnderlineClick}>U</button> */}
        <button onClick={onBoldClick}>
          <b>B</b>
        </button>
        <button className='inline styleButton' onClick={onAddImage}>
          <i
            className='material-icons'
            style={{
              fontSize: '16px',
              textAlign: 'center',
              padding: '0px',
              margin: '0px'
            }}
          >
            image
          </i>
        </button>
        <button className='inline styleButton' onClick={onAddLink}>
          <i
            className='material-icons'
            style={{
              fontSize: '16px',
              textAlign: 'center',
              padding: '0px',
              margin: '0px'
            }}
          >
            link
          </i>
        </button>
      </div>
      <div className='editors'>
        <Editor
          //@ts-ignore
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          // plugins={plugins}
          // ref="editor"
          ref={editor}
        />
      </div>
    </div>
  )
}

export default PageContainer
