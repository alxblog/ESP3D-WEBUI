import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Panel, Table } from '../../../components/Spectre'
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'
import { useWS } from '../../../hooks/useWS'

const INITIAL_STATE = [{
    "id": "T",
    "value": 0,
    "target": 0
}]

const TemperaturesPanel = ({ title }) => {
    const { parsedValues } = useWS()
    const [elements, setElements] = useState([])

    useEffect(() => {
        const { temp } = parsedValues
        if (temp.length > 0) {
            console.log('trigg')
            const [lastElement] = temp.slice(temp.length - 1)
            setElements(lastElement)
        }
    }, [parsedValues.temp])

    return (
        <Panel>
            <Panel.Header>
                <Panel.Title class="h5">{title}
                    <PanelDropdownMenu />
                </Panel.Title>
            </Panel.Header>
            <Panel.Body>
                <pre>
                    {/* {JSON.stringify(parsedValues, null, 4)} */}
                </pre>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Options</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements && elements.map(({ id, value, target }) =>
                            <tr>
                                <td>{id}</td>
                                <td>
                                    <div class="input-group">
                                        <input class="form-input input-sm" type="number" min="0" max="999" id="heaterT0SelectedTemp" value={target} />
                                        <span class="input-group-addon addon-sm">°C</span>
                                        <button class="btn btn-primary input-group-btn btn-sm">Set</button>
                                        <button class="btn input-group-btn btn-sm">Off</button>
                                    </div>
                                </td>
                                <td>{value}°C</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Panel.Body>
            <Panel.Footer />
        </Panel>
    )
}

export default TemperaturesPanel