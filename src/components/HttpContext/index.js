import { h, createContext } from 'preact'
import {
    useRef,
    useContext
} from "preact/hooks"

const HttpContext = createContext()
HttpContext.displayName = 'HttpContext'

const HttpContextProvider = ({ children }) => {
    const requestQueue = useRef([])
    const isBusy = useRef(false)

    const addInQueue = newRequest => {
        requestQueue.current = [...requestQueue.current, newRequest]
        console.log('addInQueue', requestQueue)
        if (!isBusy.current) executeHttpCall()
    }

    const removeRequestDone = () => {
        requestQueue.current = [...requestQueue.current].slice(1)
        console.log('removeRequestDone', requestQueue)
    }

    const removeRequests = requestIds => {
      const updatedRequestQueue = [...requestQueue.current].filter(({ id }) => {
        return !requestIds.includes(id)
      })
      requestQueue.current = updatedRequestQueue
    }

    const executeHttpCall = async () => {
        if (!isBusy.current) isBusy.current = true

        try {
            console.log(`requete en cours... ${requestQueue.current[0].id}`)
            const fakeCall = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(`requete terminée... ${requestQueue.current[0].id} `)
                    }, 3000)
                })
            }

            const result = await fakeCall()
            console.log(result)
            requestQueue.current[0].onSuccess(result)
        } catch (e) {
            console.log('catch')
            // remove request
            // add toast notification
        } finally {
            removeRequestDone()
            if (requestQueue.current.length > 0) {
                console.log('next')
                executeHttpCall()
            } else {
                console.log('end')
                isBusy.current = false
            }
        }
    }

    return (
        <HttpContext.Provider
            value={{ addInQueue, removeRequests }}
        >
            {children}
        </HttpContext.Provider>
    )
}

export const useHttpContext = () => {
    return useContext(HttpContext)
}

export default HttpContextProvider
