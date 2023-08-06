import styles from "./SudokuField.module.css";

type FieldProps = {
    field: number[][]
}

export function DrawField({field}: FieldProps){
    return <div>
        <table className={styles.table}>
            <tbody>
                {field.map((row, ri)=>(
                    <tr key={ri}>
                        {row.map((cell, ci)=>(
                            <td key={ci}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}