import { h } from 'preact';
import { useEffect, useState } from "preact/hooks";
import { Loading } from '../../components/Spectre'
import { useQueuing } from '../../hooks/useQueuing'
import useUI from '../../hooks/useUi'

const About = () => {
    const { createNewRequest } = useQueuing()
    const { toasts } = useUI()

    const [isLoading, setIsLoading] = useState(true)
    const [props, setProps] = useState([])

    useEffect(() => {
        getProps()
    }, [])

    const getProps = () => {
        setIsLoading(true)
        createNewRequest(
            `http://localhost:8080/command?cmd=${encodeURIComponent('[ESP420]')}`,
            { method: 'GET' },
            {
                onSuccess: result => {
                    const { Status } = JSON.parse(result)
                    setProps([...Status])
                    setIsLoading(false)
                },
                onFail: error => {
                    setIsLoading(false)
                    toasts.addToast({ content: error, type: 'error' })
                },
            }
        )
    }

    return (
        <div id="about" className="container">
            <h2>About</h2>
            <p>This is the About .</p>
            {isLoading && <Loading />}
            {!isLoading && props &&
                <ul>
                    {props.map(({ id, value }) =>
                        <li>{id} : {value}</li>
                    )}
                </ul>}
            <button className="btn" onClick={() => { getProps() }}>Refresh</button>
        </div>
    )
};

export default About;