import styles from "./Keyboard.module.css"

const BUTTOS = Array.from({ length: 10 }, (_, i) => i)

type KeyboardProps = {
    selectedNumber: number
    setSelectedNumber: (num: number) => void
    playableField: number[][]
}

export function DrawKeyboard({ selectedNumber, setSelectedNumber, playableField }: KeyboardProps) {
    let arr: number[] = [];
    for (let row of playableField) for (let e of row) arr.push(e);
    return <div style={{
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex'
    }}>
        {BUTTOS.map(x => {
            const selected = x === selectedNumber
            var complete = false
            if (x !== 0) {
                complete = arr.filter(i=> i === x).length >= 9
            }
            return <button onClick={() => setSelectedNumber(x)} className={`${styles.btn}
            ${selected && complete ? styles.active_complete : complete ? styles.complete : selected ? styles.active : ""}`} key={x}>{x === 0 ? "♦" : x}</button>
        })}
    </div>
}