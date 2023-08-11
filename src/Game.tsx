import { DrawField } from "./sudokuField";
import { Stopwatch } from "./stopwatch";
import { DrawKeyboard } from "./keyboard";
import { generateField, generateMask, generatePlayableField } from "./field";
import { useCallback, useState } from "react";
import styles from "./Game.module.css";
import { ChooseDifficulty } from "./Difficulty";

export function CreateGame() {
  const [difficulty, setDifficulty] = useState(25);
  const [field, setField] = useState(
    useCallback(() => {
      return generateField();
    }, [])
  );
  const [playableField, setPlayableField] = useState(
    useCallback(() => {
      return generatePlayableField(field, difficulty);
    }, [field, difficulty])
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
  }, [playableField, field]);

  const restart = useCallback(() => {
    let field = generateField();
    let playable = generatePlayableField(field, difficulty);
    let mask = generateMask(playable);
    setField(field);
    setPlayableField(playable);
    setMask(mask);
    setSelectedNumber(0);
    setTime(0);
    setIsRunning(true);
  }, [difficulty]);

  return (
    <div>
      <div className={styles.row}>
        <ChooseDifficulty setDifficulty={setDifficulty} />
        <button
          className={styles.restart}
          onClick={restart}
        >
          Restart
        </button>
      </div>
      <Stopwatch time={time} setTime={setTime} isRunning={isRunning} />
      <DrawField
        field={field}
        playableField={playableField}
        selectedNumber={selectedNumber}
        mask={mask}
        winCheck={winCheck}
      />
      <DrawKeyboard
        selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber}
        playableField={playableField}
      />
    </div>
  );
}
