import { h } from 'preact';
import { Panel } from '../../../components/Spectre'
import { MacroList } from '../../../components/Macro'

const ExtrusionPanel = ({ title }) => (
    <Panel>
        <Panel.Header>
            <Panel.Title class="h5">{title}</Panel.Title>
        </Panel.Header>
        <Panel.Body>
            <MacroList />
        </Panel.Body>
    </Panel>
)

export default ExtrusionPanel