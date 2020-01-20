import React, { useContext } from 'react'
import { DropzoneContext } from '../contexts/dropzone-context'
import Progress from './Progress'
import '../styles/UploadItem.css'

const truncate = str => {
  if (str.length > 37) {
    return `${str.slice(0,17)}...${str.slice(-17)}`;
  }
  return str;
}

const toHumanSize = size => {
  let units = 'B', factor = 1;
  if (size >= 1e3) {
    units = 'kB';
    factor = 1e3;
  } 
  if (size >= 1e6) {
    units = 'MB';
    factor = 1e6;
  } 
  if (size >= 1e9) {
    units = 'GB';
    factor = 1e9;
  }
  return `${(size/factor).toFixed(1)} ${units}`;
}

function UploadItem({id, file, src, href}) {
  const { loadingFiles } = useContext(DropzoneContext);
  const makeText = ({name, size}) => `${truncate(file.name)} (${toHumanSize(file.size)})`;
  return (
    <div className="UploadItem">
      <div>
        <img 
          className={loadingFiles[id] && loadingFiles[id].state === 'done' ? 'uploaded' : ''}
          src={src} 
          height="100" 
          alt={file.name} 
        />
      </div>
      <Progress loadingFile={loadingFiles[id]} />
      {href ? <a href={href}>{makeText(file)}</a>: <span>{makeText(file)}</span>}
    </div>
  )
}

export default UploadItem;