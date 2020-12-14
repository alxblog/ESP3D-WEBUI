import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Panel, Table } from '../../../components/Spectre'
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'
import { useWS } from '../../../hooks/useWS'
import useESP3D from '../../../hooks/useESP3D/index'
import { SmoothieChart, TimeSeries } from 'smoothie'

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

const TempRow = ({ id, target, value, unit = 'C' }) => {
    const { setHotEndTemp } = useESP3D()
    // const setHotEndTemp = (value, id) => {
    //     console.log(value, id)
    // }
    return (
        <tr>
            <td>{id}</td>
            <td>
                <div class="input-group">
                    <TempEntry id={id} target={target} unit={unit} setTemp={setHotEndTemp} />
                </div>
            </td>
            <td>{value} {`°${unit}`}</td>
        </tr>)
}

const Chart = () => {
    const smoothieOpt = {
        responsive: true,
        millisPerPixel: 50,
        labels: { fillStyle: '#dadee4' },
        grid: {
            fillStyle: '#ffffff',
            strokeStyle: '#eef0f3',
            sharpLines: true,
            millisPerLine: 5000,
            verticalSections: 3,
            borderVisible: false,
            limitFPS: 15,
            maxValue: 400,
            minValue: -20
        },
        limitFPS: 15
    }
    const { parsedValues } = useWS()
    const smoothie = useRef()
    const lineRef = useRef()
    const chartRef = useRef(new SmoothieChart(smoothieOpt))

    // for dev purpose
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        const canvas = smoothie.current
        // Create the chart
        lineRef.current = []
        chartRef.current.streamTo(canvas, 2000) //delay (in ms) should be eaqual to polling interval
    }, [])

    useEffect(() => {
        if (parsedValues.temp.length > 0) {
            const { temp } = parsedValues
            const lastKey = parsedValues.temp.length - 1
            temp[lastKey].forEach(sensor => {
                if (lineRef.current[sensor.id]) {
                    const val = sensor.value
                    lineRef.current[sensor.id].append(Date.now(), parseFloat(val * 100))
                }
                else {
                    lineRef.current[sensor.id] = new TimeSeries()
                    chartRef.current.addTimeSeries(lineRef.current[sensor.id], { strokeStyle: '#fc5c65' }) // to-do handle different colors
                }

            })
        }
    }, [parsedValues])



    return <div>
        <canvas id="chart" style={{ width: "100%" }} height="100" ref={smoothie} />
    </div>
}

const TemperaturesPanel = ({ title }) => {
    const { parsedValues } = useWS()
    const [elements, setElements] = useState(INITIAL_STATE)

    useEffect(() => {
        const { temp } = parsedValues
        if (temp.length > 0) {
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
                        {elements && elements.map(({ id, value, target }) =>
                            <TempRow
                                id={id}
                                value={value}
                                target={target}
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