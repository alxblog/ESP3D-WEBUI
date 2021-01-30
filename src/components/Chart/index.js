import { h, } from 'preact';
import { useEffect, useRef } from 'preact/hooks'
import { SmoothieChart, TimeSeries } from 'smoothie'
import { useWS } from '../../hooks/useWS'

const Chart = () => {
    const smoothieOpt = {
        responsive: true,
        millisPerPixel: 200,
        labels: { fillStyle: '#dadee4' },
        grid: {
            fillStyle: '#ffffff',
            strokeStyle: '#eef0f3',
            sharpLines: true,
            millisPerLine: 5000,
            verticalSections: 3,
            borderVisible: false,
            limitFPS: 15,
            // maxValue: 400,
            // minValue: -20
        },
        limitFPS: 15
    }
    const { parsedValues } = useWS()
    const smoothie = useRef()
    const lineRef = useRef()
    const chartRef = useRef(new SmoothieChart(smoothieOpt))

    // for dev purpose
    // function getRandomIntInclusive(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    useEffect(() => {
        const canvas = smoothie.current
        // Create the chart
        lineRef.current = []
        chartRef.current.streamTo(canvas, 3000) //delay (in ms) should be eaqual to polling interval

    }, [])

    useEffect(() => {
        if (parsedValues.temp.length > 0) {
            const { temp } = parsedValues
            const lastKey = parsedValues.temp.length - 1
            temp[lastKey].forEach(sensor => {
                if (lineRef.current[sensor.id]) {
                    const val = sensor.value
                    lineRef.current[sensor.id].append(Date.now(), parseFloat(val))
                }
                else {
                    lineRef.current[sensor.id] = new TimeSeries()
                    chartRef.current.addTimeSeries(lineRef.current[sensor.id], { strokeStyle: sensor.color }) // to-do handle different colors
                }

            })
        }
    }, [parsedValues])



    return <div>
        <canvas id="chart" style={{ width: "100%" }} height="100" ref={smoothie} />
    </div>
}

export default Chart