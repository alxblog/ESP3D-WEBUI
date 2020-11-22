import { h } from 'preact'
import { Button, Panel } from '../../../components/Spectre'
import { Settings } from 'preact-feather';

const PositionsPanel = ({ title }) => (
    <Panel>
        <Panel.Header>
            <Panel.Title class="h5">{title}
                <Button class="settings-dropdown" link><Settings /></Button>
            </Panel.Title>
        </Panel.Header>
        <Panel.Body>
        </Panel.Body>
        <Panel.Footer />
    </Panel>
)

export default PositionsPanel



