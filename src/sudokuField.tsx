import styles from "./SudokuField.module.css";

type FieldProps = {
  field: number[][];
  playableField: number[][];
  selectedNumber: number;
  mask: number[][];
  winCheck: ()=>void
};

export function DrawField({field, playableField, selectedNumber, mask, winCheck }: FieldProps) {
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
                        selected && playableField[rowIndex][colIndex] !== 0 ? styles.active : ""
                      }
                      onClick={() => {
                        if(selectedNumber !== -1){
                          playableField[rowIndex][colIndex] = selectedNumber
                        }
                        else{
                          playableField[rowIndex][colIndex] = field[rowIndex][colIndex]
                        }
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