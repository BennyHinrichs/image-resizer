import React, {createContext, useState } from 'react'

export const SettingsContext = createContext();

function SettingsContextProvider(props) {
  const [resizePercent, setResizePercent] = useState(100);

  return (
    <SettingsContext.Provider value={{ resizePercent, setResizePercent }}>
      { props.children }
    </SettingsContext.Provider>
  )
}

export default SettingsContextProvider;