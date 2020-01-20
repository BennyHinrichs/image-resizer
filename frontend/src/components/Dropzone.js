import React, {  useState, useRef, useContext } from 'react'
import { DropzoneContext }  from '../contexts/dropzone-context'
import '../styles/Dropzone.css'
import img from '../cloud_upload-24px.svg'

function Dropzone() {
  const [disabled,] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const { onAddFile } = useContext(DropzoneContext);

  const onChange = e => {
    onAddFile(Array.from(e.target.files), disabled);
  }

  const onDragOver = e => {
    e.preventDefault();
    setHover(true);
  }

  const onDragLeave = e => {
    e.preventDefault();
    setHover(false);
  }

  const onDrop = e => {
    e.preventDefault();
    e.target.files = Array.from(e.dataTransfer.files);
    onChange(e);
    setHover(false);
  }

  const openDialog = () => {
    if (disabled) return;
    ref.current.click();
  }

  return (
    <div 
      className={`Dropzone ${hover ? 'hover' : ''}`}
      style={{ cursor: disabled ? 'default' : 'pointer'}}
      onClick={openDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <img
        alt="upload"
        className="Icon"
        src={img}
      />
      <input
        ref={ref}
        className="FileInput"
        type="file"
        multiple
        onChange={onChange}
      />
      <span>Upload Files</span>
    </div>
  );
}

export default Dropzone;