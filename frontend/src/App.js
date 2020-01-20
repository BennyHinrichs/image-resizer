import React from 'react'
import './styles/App.css'
import Uploader from './components/Uploader'
import DropzoneContextProvider from './contexts/dropzone-context'
import SettingsContextProvider from './contexts/settings-context'

function App() {
  return (
    <div className="App">
      <SettingsContextProvider>
        <DropzoneContextProvider>
          <Uploader />
        </DropzoneContextProvider>
      </SettingsContextProvider>
    </div>
  );
}

export default App;
