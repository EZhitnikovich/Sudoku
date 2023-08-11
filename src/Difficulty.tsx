import styles from "./Difficulty.module.css";

const difficulties = [
  { label: "Easy", value: 1 },
  { label: "Medium", value: 3 },
  { label: "Hard", value: 7 },
];

type difficultyProps = {
  setDifficulty: (difficulty: number) => void;
};

export function ChooseDifficulty({ setDifficulty }: difficultyProps) {
  return (
    <div>
      <select
        onChange={(event) => setDifficulty(Number(event.target.value))}
        className={styles.selector}
      >
        {difficulties.map((difficulty) => (
          <option
            className={styles.item}
            key={difficulty.value}
            value={difficulty.value}
          >
            {difficulty.label}
          </option>
        ))}
      </select>
    </div>
  );
}
