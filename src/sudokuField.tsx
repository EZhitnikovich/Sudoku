import styles from "./SudokuField.module.css";

type FieldProps = {
  field: number[][];
  selectedNumber: number;
  mask: number[][];
  winCheck: ()=>void
};

export function DrawField({ field, selectedNumber, mask, winCheck }: FieldProps) {
  return (
    <div>
      <table className={styles.table}>
        <tbody>
          {field.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const selected = cell === selectedNumber;
                if (mask[rowIndex][colIndex] !== 0) {
                  return (
                    <td
                      className={`${selected ? styles.active : ""} ${
                        styles.blocked
                      }`}
                      key={colIndex}
                    >
                      {cell}
                    </td>
                  );
                } else {
                  return (
                    <td
                      className={
                        selected && field[rowIndex][colIndex] !== 0 ? styles.active : ""
                      }
                      onClick={() => {
                        field[rowIndex][colIndex] = selectedNumber
                        winCheck()
                      }}
                      key={colIndex}
                    >
                      {cell !== 0 ? cell : ""}
                    </td>
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