import styles from "./SudokuField.module.css";

type FieldProps = {
    field: number[][],
    selectedNumber: number,
    mask: number[][]
}

export function DrawField({field, selectedNumber, mask}: FieldProps){
    return <div>
        <table className={styles.table}>
            <tbody>
                {field.map((row, ri)=>(
                    <tr key={ri}>
                        {row.map((cell, ci)=>{
                            const selected = cell === selectedNumber
                            if(mask[ri][ci] !== 0){
                                return <td className={`${selected ? styles.active : ""} ${styles.blocked}`} key={ci}>{cell}</td>
                            }
                            else{
                                return <td className={selected && field[ri][ci] !== 0 ? styles.active : ""} onClick={() => field[ri][ci] = selectedNumber} key={ci}>{cell !== 0 ? cell : ""}</td>
                            }
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}