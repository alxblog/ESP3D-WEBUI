import { h } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import { Panel, Button, Menu } from '../../../components/Spectre'
import { Field } from '../../../components/Form/Field'
import { Send } from 'preact-feather';
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'
import { useQueuing } from '../../../hooks/useQueuing'
import { useWS } from '../../../hooks/useWS'
import useUi from '../../../hooks/useUi'

const TerminalPanel = ({ title }) => {
    const { data, addData, setData } = useWS()
    const { createNewRequest, abortRequest } = useQueuing()
    const { toasts } = useUi()
    const commandInputRef = useRef()
    const terminalRef = useRef()
    const [terminalLn, setTerminalLn] = useState()
    const [autoScroll, setAutoScroll] = useState(false)

    const clearTerminal = () => {
        setTerminalLn([])
        setData([])
    }

    const handleTerminalScroll = (e) => {
        if (terminalRef.current.scrollHeight === (terminalRef.current.scrollTop + terminalRef.current.clientHeight)) {
            if (autoScroll == false) { setAutoScroll(true) }
        }
        else setAutoScroll(false)
    }

    const scrollToBottom = () => (terminalRef.current.scrollTop = terminalRef.current.scrollHeight - terminalRef.current.clientHeight)

    useEffect(() => {
        if (autoScroll) scrollToBottom()
    }, [terminalLn])

    useEffect(() => {
        setTerminalLn([...data])
    }, [data])

    const sendCommand = () => {
        if (commandInputRef.current) {
            const input = commandInputRef.current.value
            addData({ std: 'in', value: input })
            setTerminalLn([...data])
            commandInputRef.current.value = ''
            createNewRequest(
                `http://localhost:8880/command?cmd=${encodeURIComponent(input)}`,
                { method: 'GET' },
                {
                    // onSuccess: result => { },
                    onFail: error => {
                        toasts.addToast({ content: error, type: 'error' })
                    }
                }
            )
        }
    }

    // useEffect(() => {
    //     setStdout([...stdout, ...data])
    // }, [data])

    return (
        <Panel>
            <Panel.Header>
                <Panel.Title class="h5">{title}
                    <PanelDropdownMenu>
                        {/* <Menu.Item><Field type="boolean" id="" label="Verbose" /></Menu.Item> */}
                        <Menu.Item><Field type="boolean" id="" label="Autoscroll" value={autoScroll} onClick={() => { setAutoScroll(!autoScroll) }} /></Menu.Item>
                        <Menu.Item><a href="#" onClick={(e) => { clearTerminal(); e.preventDefault(); }}>Clear</a></Menu.Item>
                    </PanelDropdownMenu>
                </Panel.Title>
            </Panel.Header>
            <Panel.Body>
                <div
                    id="terminal"
                    ref={terminalRef}
                    onScroll={handleTerminalScroll}
                >
                    {terminalLn && terminalLn.map(line => <pre class={line.std}>{line.value}</pre>)}
                </div>
                <form onSubmit={e => { e.preventDefault(); }}>
                    <div class="input-group">
                        <input type="text" class="form-input" ref={commandInputRef} />
                        <Button class="input-group-btn" primary type="submit" onclick={sendCommand}><Send /></Button>
                    </div>
                </form>
            </Panel.Body>
            <Panel.Footer />
        </Panel>
    )
}

export default TerminalPanel