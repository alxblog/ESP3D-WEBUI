import { hslToHex } from '../../utils'
class Parser {
    constructor(firmware) {
        this.firmware = firmware
        this.fileListBuffer = []
        this.isParsingFile = false
        this.currentLine = ''
        this.results = []
        this.parse = this.parse.bind(this)
        this.fileParser = this.fileParser.bind(this)
        this.returnFileList = this.returnFileList.bind(this)
    }

    //ajouter méthode pour modifier firmware
    parse(line) {
        if (isBlank(line) || isComment(line)) return null
        if (isFileListBegin(line)) { this.isParsingFile = true; return null }
        if (this.isParsingFile) {
            if (isFileListEnd(line)) {
                this.isParsingFile = false;
                const fileList = this.returnFileList()
                this.fileListBuffer = []
                return fileList
            }
            this.lineParser(this.firmware, 'files', line)
            return null
        }

        if (isTemp(line)) return this.lineParser(this.firmware, 'temp', line)
        return null
    }

    fileParser(line) {
        // const { filename, size } = line.split(' ')
        const FullMatch = [...line.matchAll(/([\w-\/~\d]+.[\d\w]+)\s(\d+)/gmi)]
        const [fullmatch, name, size] = FullMatch[0]
        this.fileListBuffer = (fullmatch) ? [...this.fileListBuffer, { name, size: parseInt(size) }] : [...this.fileListBuffer]
        return null
    }

    returnFileList() {
        // console.log('files', this.fileListBuffer)
        return {
            values: [...this.fileListBuffer],
            type: 'files'
        }
    }

    lineParser(firmware, parserName, line) {
        // interface pour splitter selon le firmware
        if (parserName === 'temp') return this.temperatureParser(line)
        if (parserName === 'files') return this.fileParser(line)
    }

    temperatureParser(line) {
        const tempRegExp = /([a-zA-Z]{1}-?\d*){1}:(-?\d+\.?\d*){1} *\/? *(\d*\.*\d*)?/gmi;
        const values = [...line.matchAll(tempRegExp)]
            .map(
                (temp, i, arr) => {
                    const hue = Math.floor(360 / arr.length * i) //generate hue depending on the number of sensors
                    return {
                        timestamp: Date.now(),
                        id: temp[1],
                        value: parseFloat(temp[2]),
                        target: parseFloat(temp[3]),
                        color: hslToHex(hue, 80, 70)
                    }
                }
            )
        return {
            values,
            type: 'temp'
        }
    }
}



const isBlank = (line) => (line === '') // à revoir pour espace blanc et retour à la ligne
const isComment = (line) => line.startsWith(';')
const isFileListBegin = (line) => line.startsWith('Begin file list')
const isFileListEnd = (line) => line.startsWith('End file list')
const isTemp = (line) => line.indexOf('T:') != -1

export default Parser

//usage

// const stdout = [
//     '',
//     '; comment line',
//     "ok T:-15.00 /0.00 @:0",
//     "T:21.62 / 0 B:25.32 / 0 B@:0 @:0 T0:21.62 / 0 ",
//     "Begin file list",
//     "LITLE-~1.GCO 156667",
//     "3X3CAB~1.GCO 663419",
//     "CLIPSO~1.GCO 608478",
//     "NJNKR_~1.GCO 921867",
//     "SONOS-~1.GCO 1807014",
//     "CCR10_~1.GCO 25265",
//     "SONOS-~2.GCO 312382",
//     "20-20_~1.GCO 362162",
//     "ABL_SE~2.GCO 1174738",
//     "RALLEN~1.GCO 2295610",
//     "End file list",
// ]

// const marlin = new Parser('marlin')

// stdout.forEach(line => {
//     const res = marlin.parse(line)
//     console.log("Result ", res)
// })
