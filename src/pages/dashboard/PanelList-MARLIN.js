import TemperaturesPanel from './Panels/TemperaturesPanel'
import PositionsPanel from './Panels/PositionsPanel'
import SpeedPanel from './Panels/SpeedPanel'
import FlowratePanel from './Panels/FlowratePanel'
import FanPanel from './Panels/FanPanel'
import ExtrusionPanel from './Panels/ExtrusionPanel'
import TerminalPanel from './Panels/TerminalPanel'
import FilesPanel from './Panels/FilesPanel'

const panelList = {
    temperatures: {
        comp: TemperaturesPanel,
    },
    positions: {
        comp: PositionsPanel,
    },
    speed: {
        comp: SpeedPanel,
    },
    flowrate: {
        comp: FlowratePanel,
    },
    fan: {
        comp: FanPanel,
    },
    extrusion: {
        comp: ExtrusionPanel,
    },
    terminal: {
        comp: TerminalPanel,
    },
    files: {
        comp: FilesPanel,
    },
}

export default panelList