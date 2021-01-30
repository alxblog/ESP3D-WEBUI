import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Panel, Table, Menu, Button } from '../../../components/Spectre'
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'
import Chart from '../../../components/Chart'
import { useWS } from '../../../hooks/useWS'
import useESP3D from '../../../hooks/useESP3D/index'
import { generateCSVContent, downloadAsCSV } from '../../../lib/csvGenerator'
import { limitArr } from '../../../utils'

const INITIAL_STATE = [{
    "id": "T0",
    "value": 0,
    "target": 0
}, {
    "id": "B0",
    "value": 0,
    "target": 0
}]

const TempEntry = ({ id, target, setTemp, unit }) => {
    const [targetState, setTargetState] = useState(target)
    useEffect(() => { setTargetState(target) }, [target])
    return (
        <Fragment>
            <input class="form-input input-sm" type="number" min="0" max="999" id="heaterT0SelectedTemp" value={targetState} onChange={(e) => setTargetState(e.target.value)} />
            <span class="input-group-addon addon-sm">{`°${unit}`}</span>
            <button class="btn btn-primary input-group-btn btn-sm" onClick={(e) => { setTargetState(targetState); setTemp(targetState, id) }}>Set</button>
            <button class="btn input-group-btn btn-sm" onClick={(e) => { setTargetState(0); setTemp(0, id) }}>Off</button>
        </Fragment>
    )
}

const TempRow = ({ id, target, value, unit = 'C', color: serieColor }) => {
    const { setHotEndTemp } = useESP3D()
    // const setHotEndTemp = (value, id) => {
    //     console.log(value, id)
    // }
    return (
        <tr>
            <td>
                <span style={{ color: serieColor }}>&#9673; </span>{id}
            </td>
            <td>
                <div class="input-group">
                    <TempEntry id={id} target={target} unit={unit} setTemp={setHotEndTemp} />
                </div>
            </td>
            <td>{value} {`°${unit}`}</td>
        </tr>)
}

const TemperaturesPanel = ({ title }) => {
    const { parsedValues } = useWS()
    const [elements, setElements] = useState(INITIAL_STATE)
    const [exportFileData, setExportFileData] = useState([])
    const maxCSVLine = 400

    useEffect(() => {
        const { temp } = parsedValues
        if (temp.length > 0) {
            const [lastElement] = temp.slice(temp.length - 1)
            setExportFileData([...limitArr(exportFileData, maxCSVLine), ...lastElement])
            setElements(lastElement)

        }
    }, [parsedValues.temp])

    return (
        <Panel>
            <Panel.Header>
                <Panel.Title class="h5">{title}
                    <PanelDropdownMenu>
                        <Menu.Item>
                            <Button link block onClick={() => { downloadAsCSV(generateCSVContent(exportFileData)) }}>
                                Export CSV
                            </Button>
                        </Menu.Item>
                    </PanelDropdownMenu>
                </Panel.Title>
            </Panel.Header>
            <Panel.Body>
                <Chart series={parsedValues} />
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Options</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements && elements.map(({ id, value, target, color }) =>
                            <TempRow
                                id={id}
                                value={value}
                                target={target}
                                color={color}
                            />
                        )}
                    </tbody>
                </Table>
            </Panel.Body>
            <Panel.Footer />
        </Panel>
    )
}

export default TemperaturesPanel