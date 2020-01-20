import React, { createContext, useState, useContext } from 'react'
import { SettingsContext } from './settings-context'
import uuid from 'uuid'

export const DropzoneContext = createContext();

function DropzoneContextProvider(props) {
  const [fileQueue, setFileQueue] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState({});
  const { resizePercent } = useContext(SettingsContext);

  const onAddFile = (files, disabled) => {
    if (disabled) return;
    files.map(file => {
      const reader = new FileReader();
      reader.onload = e => {
        setFileQueue(prevState => [...prevState, { id: uuid(), file, src: e.target.result }])
      }
      reader.readAsDataURL(file);
      return file;
    })
  }

  const clearFileQueue = () => {
    setFileQueue([]);
  }

  const uploadFile = ({ id, file }) => {
    console.log('uploading ' + file.name)
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.responseType = 'json';
      const formData = new FormData();
      file.id = id;
      formData.append('file', file, file.name);
      formData.append('resizePercent', resizePercent);

      req.upload.addEventListener("progress", e => {
        if (e.lengthComputable) {
          setLoadingFiles(prevState => {
            return { ...prevState, [id]: { state: 'pending', percent: (e.loaded / e.total) * 100 } }
          });
        }
      });

      req.addEventListener("load", e => {
        setLoadingFiles(prevState => {
          return { ...prevState, [id]: { state: 'done', percent: 100 } }
        });
        setFileQueue(prevState => {
          return prevState.map(f => {
            f.file.name === file.name && (f.href = req.response[file.name])
            return f;
          });
        })
        resolve(req.response);
      });

      req.upload.addEventListener("error", e => {
        setLoadingFiles(prevState => {
          return { ...prevState, [id]: { state: 'error', percent: 0 } }
        });
        reject(req.response);
      });

      req.open("POST", "/upload", true);
      req.send(formData);
    })
  }
  const uploadFileQueue = () => {
    console.log('uploading');
    fileQueue.forEach(uploadFile);
  }

  return (
    <DropzoneContext.Provider value={{ fileQueue, loadingFiles, onAddFile, clearFileQueue, uploadFileQueue }}>
      {props.children}
    </DropzoneContext.Provider>
  )
}

export default DropzoneContextProvider;