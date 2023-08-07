const n = 3
const length = n*n
export function generateField(): number[][] {
    var field: number[][] = []
    for (let i = 0; i < length; i++) {
        let row: number[] = []
        for (let j = 0; j < length; j++) {
            row.push((i * n + Math.trunc(i / n) + j) % length + 1)
        }
        field.push(row)
    }    
    shuffleRows(field)
    shuffleColumns(field)
    return field
}

export function generatePlayableField(field:number[][]): number[][]{
    var playableField:number[][] = field.map(function(arr) {
        return arr.slice();
    })

    for (let i = 0; i < playableField.length; i++) {
        for(let j = 0; j < playableField[i].length; j++){
            if(generateRandom(1, -1) == 1)
                playableField[i][j] = 0
            
        }
    }

    return playableField
}

export function generateMask(playableField:number[][]): number[][]{
    var mask : number[][] = playableField.map(function(arr) {
        return arr.slice();
    })

    for (let i = 0; i < playableField.length; i++) {
        for(let j = 0; j < playableField[i].length; j++){
            if(playableField[i][j] === 0){
                mask[i][j] = 0
            }
            else{
                mask[i][j] = 1
            }
        }
    }

    return mask
}

function shuffleRows(field:number[][]) : number[][]{
    randomSwapN(field)
    return field
}

function shuffleColumns(field:number[][]): number[][] {
    let indexes = Array.from(Array(length).keys());
    randomSwapN(indexes)
    
    for (let i = 0; i < length; i++) {
        var row = field[i]
        field[i] = [...indexes.map(i => row[i]),
                    ...row.slice(length)]
    }
    return field
}

function randomSwapN(arr:Array<any>): Array<any>{
    for (let i = 0; i < n; i++) {
        let index1 = generateRandom(n+i*n, -1) + i*n;
        let index2 = generateRandom(n+i*n, index1 - i*n) + i*n;
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
    }
    return arr;
}

function generateRandom(max:number, except: number): number {
    var num = Math.floor(Math.random()*n)
    return ([except].includes(num))? generateRandom(max, except) : num
}