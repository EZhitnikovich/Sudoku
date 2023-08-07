import { DrawField } from './sudokuField';
import { Stopwatch } from './stopwatch';
import { DrawKeyboard } from './keyboard';
import { generateField, generateMask, generatePlayableField } from './field';
import { useEffect, useState } from 'react';
import keyboardStyle from './Keyboard.module.css'

function App() {
  const [field, setField] = useState(generateField())
  const [playableField, setPlayableField] = useState(generatePlayableField(field))
  const [mask, setMask] = useState(generateMask(playableField))

  const [selectedNumber, setSelectedNumber] = useState<number>(0)
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (JSON.stringify(playableField) === JSON.stringify(field)) {
      setIsWin(true)
      setIsRunning(false)
    }
  })

  const restart = () => {
    let field = generateField()
    let playable = generatePlayableField(field)
    let mask = generateMask(playable)
    setField(field)
    setPlayableField(playable)
    setMask(mask)
    setSelectedNumber(0)
    setTime(0)
    setIsRunning(true)
    setIsWin(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>{isWin ? "Win" : ""}</div>
      <Stopwatch time={time} setTime={setTime} isRunning={isRunning} />
      <DrawField field={playableField} selectedNumber={selectedNumber} mask={mask} />
      <DrawKeyboard selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className={keyboardStyle.btn} style={{ width: '75px' }} onClick={restart}>restart</button>
      </div>
    </div>
  );
}

export default App;
