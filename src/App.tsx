import { DrawField } from './sudokuField';
import { Stopwatch } from './stopwatch';
import { DrawKeyboard } from './keyboard';
import { generateField, generateMask, generatePlayableField } from './field';
import { useEffect, useState } from 'react';

function App() {
  const [field, setField] = useState(() => {
    return generateField()
  })
  const [playableField, setPlayableField] = useState(() => {
    return generatePlayableField(field)
  })
  const [mask, setMask] = useState(()=>{
    return generateMask(playableField)
  })
  
  const [selectedNumber, setSelectedNumber] = useState<number>(0)
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isWin, setIsWin] = useState(false);

  useEffect(()=>{
    if(JSON.stringify(playableField) === JSON.stringify(field)){
      setIsWin(true)
      setIsRunning(false)
    }
  })

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center', fontWeight:'bold', fontSize:'20px'}}>{isWin ? "Win" : ""}</div>
      <Stopwatch time={time} setTime={setTime} isRunning={isRunning}/>
      <DrawField field={playableField} selectedNumber={selectedNumber} mask={mask}/>
      <DrawKeyboard selectedNumber={selectedNumber} 
                    setSelectedNumber={setSelectedNumber}/>
    </div>
  );
}

export default App;
