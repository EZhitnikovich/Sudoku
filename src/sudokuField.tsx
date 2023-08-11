import styles from "./SudokuField.module.css";

type FieldProps = {
  field: number[][];
  playableField: number[][];
  selectedNumber: number;
  mask: number[][];
  winCheck: () => void;
};

type BlockedCellProps = {
  isSelected: boolean;
  key: number;
  cell: number;
};

type PlayableCellProps = {
  isSelected: boolean;
  key: number;
  selectedNumber: number;
  fieldValue: number;
  playableField: number[][];
  row: number;
  col: number;
  winCheck: () => void;
};

export function DrawField({
  field,
  playableField,
  selectedNumber,
  mask,
  winCheck,
}: FieldProps) {
  return (
    <div>
      <table className={styles.table}>
        <tbody>
          {playableField.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const selected = cell === selectedNumber;
                if (mask[rowIndex][colIndex] !== 0) {
                  return (
                    <BlockedCell
                      cell={cell}
                      key={colIndex * rowIndex}
                      isSelected={selected}
                    />
                  );
                } else {
                  return (
                    <PlayableCell
                      fieldValue={field[rowIndex][colIndex]}
                      isSelected={selected}
                      key={colIndex * rowIndex}
                      playableField={playableField}
                      selectedNumber={selectedNumber}
                      winCheck={winCheck}
                      col={colIndex}
                      row={rowIndex}
                    />
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockedCell({ isSelected, key, cell }: BlockedCellProps) {
  return (
    <td
      className={`${isSelected ? styles.active : ""} ${styles.blocked}`}
      key={key}
    >
      {cell}
    </td>
  );
}

function PlayableCell({
  isSelected,
  selectedNumber,
  playableField,
  row,
  col,
  fieldValue,
  winCheck,
  key,
}: PlayableCellProps) {
  return (
    <td
      className={
        isSelected && playableField[row][col] !== 0 ? styles.active : ""
      }
      onClick={() => {
        if (selectedNumber !== -1) {
          playableField[row][col] = selectedNumber;
        } else {
          playableField[row][col] = fieldValue;
        }
        winCheck();
      }}
      key={key}
    >
      {playableField[row][col] !== 0 ? playableField[row][col] : ""}
    </td>
  );
}
