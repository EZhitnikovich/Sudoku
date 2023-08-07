import styles from "./SudokuField.module.css";

type FieldProps = {
    field: number[][],
    selectedNumber: number
}

export function DrawField({field, selectedNumber}: FieldProps){
    return <div>
        <table className={styles.table}>
            <tbody>
                {field.map((row, ri)=>(
                    <tr key={ri}>
                        {row.map((cell, ci)=>{
                            const selected = cell === selectedNumber && cell != 0
                            return <td className={selected ? styles.active : ""} key={ci}>{cell}</td>
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}