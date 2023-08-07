import { DrawField } from './sudokuField';
import { DrawKeyboard } from './keyboard';
import { generateField } from './field';
import { useState } from 'react';

function App() {
  const [field, setField] = useState(() => {
    return generateField()
  })
  
  const [selectedNumber, setSelectedNumber] = useState<number>(1)

  return (
    <div>
      <DrawField field={field} selectedNumber={selectedNumber}/>
      <DrawKeyboard selectedNumber={selectedNumber} 
                    setSelectedNumber={setSelectedNumber}/>
      <div>{selectedNumber}</div>
    </div>
  );
}

export default App;
