import styles from "./Keyboard.module.css"

const BUTTOS = Array.from({ length: 10 }, (_, i) => i)

type KeyboardProps = {
    selectedNumber: number
    setSelectedNumber: (num: number) => void
}

export function DrawKeyboard({ selectedNumber, setSelectedNumber }: KeyboardProps) {
    return <div style={{
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex'
    }}>
        {BUTTOS.map(x => {
            const selected = x === selectedNumber
            return <button onClick={() => setSelectedNumber(x)} className={`${styles.btn} ${selected ? styles.active : ""}`} key={x}>{x === 0 ? "♦" : x}</button>
        })}
    </div>
}