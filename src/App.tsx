import { DrawField } from './sudokuField';
import { DrawKeyboard } from './keyboard';
import { generateField } from './field';

function App() {
  var field: number[][] = generateField()
  return (
    <div>
      <DrawField field={field}/>
      <DrawKeyboard />
    </div>
  );
}

export default App;
