import React, { useContext } from 'react'
import Button from './Button'
import Dropzone from './Dropzone'
import { DropzoneContext }  from '../contexts/dropzone-context'
import RangeSlider from './RangeSlider'
import { SettingsContext }  from '../contexts/settings-context'
import UploadItem from './UploadItem'
import '../styles/Uploader.css'

function Uploader() {
  const { fileQueue, clearFileQueue, uploadFileQueue } = useContext(DropzoneContext);
  const { resizePercent, setResizePercent } = useContext(SettingsContext);
  // console.log(fileQueue);
  return (
    <div className="Uploader Card">
      <div className="Content">
        <Dropzone />
        <div className="Files">
          {fileQueue.map(fileData => <UploadItem key={fileData.id} {...fileData} />)}
        </div>
      </div>
      <div className="Actions">
        <RangeSlider value={resizePercent} onChange={e => setResizePercent(e.target.value)} />
        <div className="buttons">
          <Button label={'Clear'} onClick={clearFileQueue} disabled={fileQueue.length < 1} />
          <Button label={`Upload ${fileQueue.length ? fileQueue.length : ''}`} onClick={uploadFileQueue} disabled={fileQueue.length < 1} />
        </div>
      </div>
    </div>
  );
}

export default Uploader;