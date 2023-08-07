import styles from "./Keyboard.module.css"

const BUTTOS = Array.from({length: 9}, (_, i) => i + 1)

type KeyboardProps = {
    selectedNumber : number
    setSelectedNumber : (num: number) => void
}

export function DrawKeyboard({ selectedNumber, setSelectedNumber }: KeyboardProps){
    return <div style={{margin:'auto',
    justifyContent:'center',
    display:'flex'}}>
        {BUTTOS.map(x =>{
            const selected = x === selectedNumber
            return <button onClick={() => setSelectedNumber(x)} className={`${styles.btn} ${selected ? styles.active : ""}`} key={x}>{x}</button>
        })}
    </div>
}