import React, { useState, useContext } from 'react'
import { SettingsContext }  from '../contexts/settings-context'
import '../styles/RangeSlider.css'

const oneRem = parseFloat(getComputedStyle(document.documentElement).fontSize);

function RangeSlider({ value, onChange }) {
  const { resizePercent } = useContext(SettingsContext);
  const [translateX, setTranslateX] = useState('0px');

  const onChangeFull = e => {
    const percent = e.target.value / 100;
    setTranslateX(`${((e.target.clientWidth - 1.25 * oneRem) * (percent - 1)).toFixed(1)}px`)
    onChange(e);
  }

  return(
    <div className="RangeSlider">
      <div className="RangeSlider-labels">
        <span style={{transform: `scale(${resizePercent / 100})`}}>Resize</span>
        <label style={{transform: `translateX(${translateX})`}}>{value}%</label>
      </div>
      <input
        type="range"
        value={value}
        onChange={onChangeFull}
      />
    </div>
  )
}

export default RangeSlider;