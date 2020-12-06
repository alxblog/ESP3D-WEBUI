import { h, createContext } from 'preact'
import { useState, useEffect, useRef } from "preact/hooks"

export const WsContext = createContext()
WsContext.displayName = "wsContext"

const WsContextProvider = ({ children }) => {
    const dataBuffer = useRef([])
    const [wsConnection, setWsConnection] = useState()
    const [wsData, setWsData] = useState([])
    const webSocketIp = 'localhost'
    const webSocketPort = 81

    const splitArrayBufferByLine = (arrayBuffer) => {
        const bytes = new Uint8Array(arrayBuffer)
        return bytes.reduce((acc, curr) => {
            if (curr == 10 || curr == 13) return [...acc, []]
            const i = Number(acc.length - 1)
            return [...acc.slice(0, i), [...acc[i], curr]]
        }, [[]])
    }

    const onMessageCB = (e) => {
        //for binary messages used for terminal
        const stdOutData = e.data
        if (stdOutData instanceof ArrayBuffer) {
            const newLines = splitArrayBufferByLine(stdOutData)
                .map(line =>
                    line.reduce((acc, curr) =>
                        acc + String.fromCharCode(curr), '')
                )
            dataBuffer.current = [...dataBuffer.current, ...newLines]
        }
        else dataBuffer.current = [...dataBuffer.current, stdOutData] //others txt messages
        setWsData(dataBuffer.current)
    }

    const onCloseCB = (e) => {
        console.log(e)
    }
    
    const onErorCB = (e) => {
        console.log(e)
        // toasts.addToast({ content: e, type: 'error' })
    }

    useEffect(() => {
        const ws = new WebSocket(`ws://${webSocketIp}:${webSocketPort}`, ['arduino'])
        ws.binaryType = "arraybuffer"
        setWsConnection(ws)

        //Handle msg of ws
        ws.onmessage = e => onMessageCB(e)
        ws.onclose = e => onCloseCB(e)
        ws.onerror = e => onErorCB(e)

        return () => { if (wsConnection) ws.close() }
    }, [])

    const setData = (cmdLine) => {
        const newWsData = [...wsData, cmdLine]
        dataBuffer.current = newWsData
        setWsData(newWsData)
    }

    const store = {
        ws: wsConnection,
        data: wsData,
        setData
    }

    return (
        <WsContext.Provider value={store}>
            {children}
        </WsContext.Provider>
    )
}

export default WsContextProvider