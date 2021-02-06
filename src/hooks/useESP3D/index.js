import { h } from 'preact'
import { useQueuing } from '../../hooks/useQueuing'
import useUI from '../../hooks/useUi'

const useESP3D = () => {
    const { toasts } = useUI()
    const { createNewRequest } = useQueuing()
    const baseURL2 = 'http://localhost:8880'

    const sendSerialCmd = (cmd) => {
        return new Promise((resolve, reject) => {
            createNewRequest(
                `http://localhost:8880/command?cmd=${encodeURIComponent(cmd)}`,
                { method: 'GET' },
                {
                    onSuccess: result => { resolve(result) },
                    onFail: error => { reject(error) },
                }
            )
        })
    }

    const setTemp = async (type, t = 0, s) => {
        const cmd = (type === 'hotend') ? 'M104' : 'M140'
        try {
            // const res = await sendSerialCmd()
            const res = await sendSerialCmd(`${cmd} ${t} S${s}`)
        } catch (e) {
            toasts.addToast({ content: "boooo", type: 'error' })
            console.log(e)
        }
    }

    const setHotEndTemp = async (temp, t = 0) => { setTemp('hotend', t, temp) }

    const setBedTemp = (temp, t = 0) => { setTemp('bed', t, temp) }

    const setPosition = (i = 0, temp) => { }
    const setSpeed = () => { }
    const setFlowrate = () => { }
    const setFan = () => { }

    const getPrinterListSD = async (extra = '') => {
        try {
            // const res = await sendSerialCmd()
            await sendSerialCmd(`M21`)
            await sendSerialCmd(`M20 ${extra}`)
        } catch (e) {
            toasts.addToast({ content: JSON.stringify(e), type: 'error' })
            console.log(e)
        }
    }

    const runJobFromPath = async (filepath) => {
        try {
            await sendSerialCmd(`M23 ${filepath}`)
            await sendSerialCmd(`M24`)
        } catch (e) {
            toasts.addToast({ content: JSON.stringify(e), type: 'error' })
            console.log(e)
        }
    }

    const getEspFsList = () => {
        return new Promise((resolve, reject) => {
            createNewRequest(
                `http://localhost:8880/files?path=/`,
                { method: 'GET' },
                {
                    onSuccess: result => { resolve(result) },
                    onFail: error => { reject(error) },
                }
            )
        })
    }

    return {
        sendSerialCmd,
        setTemp,
        setHotEndTemp,
        setBedTemp,
        setPosition,
        setSpeed,
        setFlowrate,
        setFan,
        getPrinterListSD,
        getEspFsList,
        runJobFromPath
    }
}

export default useESP3D