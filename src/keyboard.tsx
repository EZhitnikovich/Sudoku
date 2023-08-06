const BUTTOS = Array.from({length: 9}, (_, i) => i + 1)

export function DrawKeyboard(){
    return <div>
        {BUTTOS.map((x, i) =>(
            <button key={i}>{x}</button>
        ))}
    </div>
}