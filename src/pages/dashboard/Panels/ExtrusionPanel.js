import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Button, Panel } from '../../../components/Spectre'
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'

import { Settings } from 'preact-feather';

const ExtrusionPanel = (
    {
        children,
        activeExtruder,
        extruders = [],
        handleSetExtruder,
        handleSetFeedrate,
        handleSetLength,
        handleExtrude
    }) => {

    const [currExtruder, setCurrExtruder] = useState(0)
    const [length, setLength] = useState()

    return (
        <Panel>
            <Panel.Header>
                <Panel.Title class="h5">
                    Extrusion
                    <PanelDropdownMenu />
                </Panel.Title>
            </Panel.Header>
            <Panel.Nav>
                <ul class="tab tab-block">
                    {
                        extruders.map(({ id }) =>
                            <li class="tab-item" key={id}>
                                <a
                                    className={id == currExtruder ? 'active' : ''}
                                    href=""
                                    style={{ display: 'block', }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSetExtruder(id)
                                        setCurrExtruder(id)
                                    }}
                                >
                                    Extruder #{id}
                                </a>
                            </li>)
                    }
                </ul>
            </Panel.Nav>
            <Panel.Body>
                <div class="input-group mt-2">
                    <span class="input-group-addon">Feedrate</span>
                    <input
                        class="form-input"
                        type="number" placeholder="400"
                        value={activeExtruder.feedrate}
                        onChange={(e) => { handleSetFeedrate(activeExtruder.id, e.target.value) }}
                    />
                    <span class="input-group-addon">mm/min</span>
                </div>
                <div class="input-group mt-2">
                    <input
                        class="form-input"
                        type="number"
                        placeholder="10"
                        onChange={(e) => { handleSetLength(e.target.value); setLength(e.target.value) }}
                        value={length}
                    />
                    <span class="input-group-addon">mm</span>
                </div>
                {children}
            </Panel.Body>
            <Panel.Footer class="actions">
                <div className="columns">
                    <div className="column col-6">
                        <Button block primary onClick={() => { handleExtrude(false); setLength(null) }}>Retract</Button>
                    </div>
                    <div className="column col-6">
                        <Button block primary onClick={() => { handleExtrude(); setLength(null) }}>Extrude</Button>
                    </div>
                </div>
            </Panel.Footer>
        </Panel>
    )
}

const ExtrusionPanelController = () => {
    const extruderListFake = [
        {
            id: 0,
            feedrate: 600
        },
        {
            id: 1,
            feedrate: 700
        },
        {
            id: 3,
            feedrate: 800
        },
    ]
    const [extruderList, setExtruderList] = useState(extruderListFake)
    const [currExtruder, setCurrExtruder] = useState(extruderList[0])
    const [length, setLength] = useState(0)

    const handleExtrude = (extrusionMode = true) => {
        alert(
            extrusionMode ?
                `${currExtruder.id} : Extrude G1 E${length} F${currExtruder.feedrate}` :
                `${currExtruder.id} : Retract G1 E${0 - length} F${currExtruder.feedrate}`)
        setLength(0)
    }

    const handleSetExtruder = (id) => {
        setCurrExtruder(
            extruderList.find(extruder => extruder.id == id)
        )
    }

    const updateExtruder = (id, props) => {
        try {
            const extruderIndex = extruderList.findIndex(extruderList => extruderList.id == id)
            let newExtruderList = [...extruderList]
            Object.assign(newExtruderList[extruderIndex], props)
            setExtruderList([...newExtruderList])
        } catch (error) {
            console.error(`Extruder id: '${id}' not found`) //add a toast
        }
    }

    useEffect(() => {
        // Retrieve extruder list
    }, [])

    return (
        <ExtrusionPanel
            activeExtruder={currExtruder}
            extruders={extruderList}
            handleSetExtruder={handleSetExtruder}
            handleSetLength={(e) => { setLength(e) }}
            handleSetFeedrate={(id, value) => { updateExtruder(id, { feedrate: value }) }}
            handleExtrude={handleExtrude}
        >
        </ExtrusionPanel>
    )
}

export default ExtrusionPanelController