import { DrawField } from "./sudokuField";
import { Stopwatch } from "./stopwatch";
import { DrawKeyboard } from "./keyboard";
import { generateField, generateMask, generatePlayableField } from "./field";
import { useCallback, useState } from "react";
import keyboardStyle from "./Keyboard.module.css";

function App() {
  const [field, setField] = useState(
    useCallback(() => {
      return generateField();
    }, [])
  );
  const [playableField, setPlayableField] = useState(
    useCallback(() => {
      return generatePlayableField(field);
    }, [field])
  );
  const [mask, setMask] = useState(
    useCallback(() => {
      return generateMask(playableField);
    }, [playableField])
  );

  const [selectedNumber, setSelectedNumber] = useState<number>(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const winCheck = useCallback(() => {
    if (JSON.stringify(playableField) === JSON.stringify(field)) {
      setIsRunning(false);
    }
    console.log("check");
  }, [playableField, field]);

  const restart = useCallback(() => {
    let field = generateField();
    let playable = generatePlayableField(field);
    let mask = generateMask(playable);
    setField(field);
    setPlayableField(playable);
    setMask(mask);
    setSelectedNumber(0);
    setTime(0);
    setIsRunning(true);
  }, []);

  return (
    <div>
      <Stopwatch time={time} setTime={setTime} isRunning={isRunning} />
      <DrawField
        field={playableField}
        selectedNumber={selectedNumber}
        mask={mask}
        winCheck={winCheck}
      />
      <DrawKeyboard
        selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber}
        playableField={playableField}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className={keyboardStyle.btn}
          style={{ width: "75px" }}
          onClick={restart}
        >
          restart
        </button>
      </div>
    </div>
  );
}

export default App;
